package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.model.Dean;
import com.iww.deanmeetingreservations.model.Guest;
import com.iww.deanmeetingreservations.model.Meeting;
import com.iww.deanmeetingreservations.repository.GuestRepository;
import com.iww.deanmeetingreservations.repository.MeetingRepository;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class DeanMeetingPropositionsManagementServiceImpl implements DeanMeetingPropositionsManagementService {

    @Autowired
    MeetingRepository meetingRepository;

    @Autowired
    GuestRepository guestRepository;

    @Override
    public ResponseEntity<String> acceptMeeting(UUID meetingId) {
        Optional<Meeting> optionalMeeting = meetingRepository.findById(meetingId);

        if (optionalMeeting.isEmpty()) {
            return new ResponseEntity<>("Meeting not found", HttpStatus.NOT_FOUND);
        }

        Meeting meeting = optionalMeeting.get();

        if (meeting.isAcceptedByDean()) {
            return new ResponseEntity<>("Meeting already confirmed", HttpStatus.GONE);
        }

        meeting.setAcceptedByDean(true);

        Guest guest = meeting.getGuest();
        Dean dean = meeting.getDean();
        String guestEmail = guest.getEmail();
        String startDateTime = meeting.getBeginsAt().toString();
        String endDateTime = meeting.getBeginsAt().plusMinutes(meeting.getDuration()).toString();
        String location = meeting.isOnline() ? "MS Teams" : "Dean's office";

        String[] messageContent = new String[]{
                dean.getFirstname() + " " + dean.getLastname(),
                startDateTime, endDateTime, location,
                meeting.getDescription()
        };

        try {
            sendEmailMeetingConfirmedOrRejectedByDean(messageContent, guestEmail, System.getenv("DEAN_CONFIRMED_TEMPLATE_ID"));
        } catch (IOException e) {
            return new ResponseEntity<>(
                    "Cannot confirm meeting: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

        meetingRepository.save(meeting);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @Override
    public ResponseEntity<String> rejectMeeting(UUID meetingId) {
        Optional<Meeting> optionalMeeting = meetingRepository.findById(meetingId);

        if (optionalMeeting.isEmpty()) {
            return new ResponseEntity<>("Meeting not found", HttpStatus.NOT_FOUND);
        }

        Meeting meeting = optionalMeeting.get();

        if (meeting.isRejectedByDean())
            return new ResponseEntity<>("Meeting already rejected", HttpStatus.GONE);

        if (meeting.isAcceptedByDean())
            return new ResponseEntity<>("Cannot reject previously accepted meeting", HttpStatus.GONE);

        meeting.setRejectedByDean(true);

        Guest guest = meeting.getGuest();
        Dean dean = meeting.getDean();
        String guestEmail = guest.getEmail();
        String startDateTime = meeting.getBeginsAt().toString();
        String endDateTime = meeting.getBeginsAt().plusMinutes(meeting.getDuration()).toString();
        String location = meeting.isOnline() ? "MS Teams" : "Dean's office";

        String[] messageContent = new String[]{
                dean.getFirstname() + " " + dean.getLastname(),
                startDateTime,
                endDateTime,
                meeting.getDescription(),
                location
        };

        try {
            sendEmailMeetingConfirmedOrRejectedByDean(messageContent, guestEmail, System.getenv("DEAN_REJECTED_TEMPLATE_ID"));
        } catch (IOException e) {
            return new ResponseEntity<>(
                    "Cannot reject meeting: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

        meetingRepository.save(meeting);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @Override
    public void sendEmailMeetingConfirmedOrRejectedByDean(String[] messageContent, String emailAddress, String emailTemplate) throws IOException {
        Email from = new Email(System.getenv("SENDER_EMAIL"));
        String subject = "Meeting confirmed";
        Email to = new Email(emailAddress);
        Content content = new Content("text/html",
                "It's fucking pointless giving content for this message," +
                "while we don't map it in template for this message, but for some reason it's required omg");
        Mail mail = new Mail(from, subject, to, content);

        mail.personalization.get(0).addDynamicTemplateData("dean-name-surname", messageContent[0]);
        mail.personalization.get(0).addDynamicTemplateData("start-date", messageContent[1]);
        mail.personalization.get(0).addDynamicTemplateData("end-date", messageContent[2]);
        mail.personalization.get(0).addDynamicTemplateData("description", messageContent[3]);
        mail.personalization.get(0).addDynamicTemplateData("location", messageContent[4]);

        if (messageContent.length == 7) {
            mail.personalization.get(0).addDynamicTemplateData("new-start-date", messageContent[5]);
            mail.personalization.get(0).addDynamicTemplateData("new-end-date", messageContent[6]);
        }

        mail.setTemplateId(emailTemplate);

        SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
        Request request = new Request();

        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        Response response = sg.api(request);

        System.out.println(response.getStatusCode());
        System.out.println(response.getBody());
        System.out.println(response.getHeaders());
    }

    public ResponseEntity<String> suggestChangesToMeeting(UUID meetingId, LocalDateTime newMeetingDateTime, int newMeetingDuration) {
        // TODO: Restrict possible dates to range defined by dean's duties, i.e cannot change meeting to wednesday, if
        // TODO: office hours are only on mondays
        Optional<Meeting> optionalMeeting = meetingRepository.findById(meetingId);

        if (optionalMeeting.isEmpty()) {
            return new ResponseEntity<>("Meeting not found", HttpStatus.NOT_FOUND);
        }

        Meeting meeting = optionalMeeting.get();
        LocalDateTime meetingDateTime = meeting.getBeginsAt();
        String startDateTime = meeting.getBeginsAt().toString();
        String endDateTime = meeting.getBeginsAt().plusMinutes(meeting.getDuration()).toString();
        int meetingDuration = meeting.getDuration();
        LocalDateTime newEndTime = null;

        if (meeting.isAcceptedByDean())
            return new ResponseEntity<>("Cannot modify confirmed meeting", HttpStatus.FORBIDDEN);

        if (newMeetingDateTime == null && newMeetingDuration == 0)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        if (newMeetingDateTime != null) {
            if (newMeetingDateTime.isEqual(meetingDateTime) && (newMeetingDuration == meetingDuration || newMeetingDuration == 0))
                return new ResponseEntity<>("Nothing to change", HttpStatus.NOT_MODIFIED);

            if (newMeetingDateTime != meetingDateTime)
                meeting.setBeginsAt(newMeetingDateTime);

            if (newMeetingDateTime.equals(meetingDateTime))
                newEndTime = newMeetingDateTime.plusMinutes(meetingDuration);
        } else {
            newMeetingDateTime = meetingDateTime;

            if (newMeetingDuration == meetingDuration)
                return new ResponseEntity<>("Nothing to change", HttpStatus.NOT_MODIFIED);
        }

        if (newMeetingDuration != 0) {
            if (newMeetingDuration != meetingDuration) {
                meeting.setDuration(newMeetingDuration);
                if (newMeetingDateTime != null)
                    newEndTime = newMeetingDateTime.plusMinutes(newMeetingDuration);
            } else {
                newEndTime = newMeetingDateTime.plusMinutes(meetingDuration);
            }
        } else {
            newEndTime = newMeetingDateTime.plusMinutes(meetingDuration);
        }

        meeting.setGuestAndMeetingConfirmed(false);

        Guest guest = meeting.getGuest();
        Dean dean = meeting.getDean();
        String guestEmail = guest.getEmail();
        String location = meeting.isOnline() ? "MS Teams" : "Dean's office";

        if (newMeetingDateTime == null) {
            return new ResponseEntity<>("Something went not good", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        String[] messageContent = new String[]{
                dean.getFirstname() + " " + dean.getLastname(),
                startDateTime, endDateTime, location,
                meeting.getDescription(),
                newMeetingDateTime.toString(), newEndTime.toString()
        };

        try {
            sendEmailMeetingConfirmedOrRejectedByDean(messageContent, guestEmail, System.getenv("DEAN_SUGGESTS_CHANGES_TEMPLATE_ID"));
        } catch (IOException e) {
            return new ResponseEntity<>(
                    "Cannot confirm meeting: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

        meetingRepository.save(meeting);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
