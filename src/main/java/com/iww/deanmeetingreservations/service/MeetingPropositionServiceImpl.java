package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.dto.GuestDto;
import com.iww.deanmeetingreservations.dto.MeetingPropositionDto;
import com.iww.deanmeetingreservations.model.Dean;
import com.iww.deanmeetingreservations.model.Guest;
import com.iww.deanmeetingreservations.model.Meeting;
import com.iww.deanmeetingreservations.repository.DeanRepository;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class MeetingPropositionServiceImpl implements MeetingPropositionService {

    @Autowired
    DeanRepository deanRepository;

    @Autowired
    GuestRepository guestRepository;

    @Autowired
    MeetingRepository meetingRepository;

    @Override
    public Meeting addMeeting(MeetingPropositionDto meetingPropositionDto, String hostUrl) throws Exception {
        UUID deanId = meetingPropositionDto.getDeanId();
        Optional<Dean> dean = deanRepository.findById(deanId);
        GuestDto guestDto = meetingPropositionDto.getGuest();
        String guestEmail = guestDto.getEmail();

        if (dean.isEmpty())
            throw new Exception("Dean with provided ID do not exists");

        Guest guest;

        Optional<Guest> optionalGuest = guestRepository.findByEmail(guestEmail);

        if (optionalGuest.isPresent()) {
            guest = optionalGuest.get();
        } else {
            String name = guestDto.getName();
            String surname = guestDto.getSurname();
            String status = guestDto.getStatus();

            guest = new Guest(name, surname, guestEmail, status);

            guestRepository.save(guest);
        }

        String meetingDescription = meetingPropositionDto.getDescription();
        String meetingBeginsAtHour = meetingPropositionDto.getBeginsAt();
        int meetingDuration = meetingPropositionDto.getDuration();
        boolean isMeetingOnline = meetingPropositionDto.isOnline();

        int meetingBeginsAtHours = Integer.parseInt(meetingBeginsAtHour.substring(0, meetingBeginsAtHour.indexOf(':')));
        int meetingBeginsAtMinutes = Integer.parseInt(meetingBeginsAtHour.substring(meetingBeginsAtHour.indexOf(':') + 1));

        LocalDateTime meetingBeginsAt = LocalDate.now().atTime(meetingBeginsAtHours, meetingBeginsAtMinutes);

        Meeting meeting = new Meeting(guest, dean.get(),
                meetingDescription, meetingBeginsAt,
                meetingDuration, isMeetingOnline);

        UUID meetingId;

        try {
            meetingId = meetingRepository.save(meeting).getId();
        } catch (Exception e) {
            throw new Exception("Error while saving meeting information: " + e.getMessage());
        }

        String confirmationLink = hostUrl.concat("/confirm-meeting/").concat(meetingId.toString());
        sendConfirmationEmail(confirmationLink, guestEmail);

        return meeting;
    }

    @Override
    public void sendConfirmationEmail(String messageContent, String emailAddress) throws IOException {
        Email from = new Email(System.getenv("SENDER_EMAIL"));
        String subject = "Confirm your data and meeting request";
        Email to = new Email(emailAddress);
        Content content = new Content("text/html", "not important");
        Mail mail = new Mail(from, subject, to, content);

        mail.personalization.get(0).addDynamicTemplateData("confirmationLink", messageContent);

        mail.setTemplateId(System.getenv("GUEST_CONFIRM_TEMPLATE_ID"));

        System.out.println("SendGrid API: " + System.getenv("SENDGRID_API_KEY"));

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

    @Override
    public void confirmMeeting(String id) throws Exception {
        meetingRepository.flush();

        Optional<Meeting> optionalMeeting = meetingRepository.findById(UUID.fromString(id));

        if (optionalMeeting.isPresent()) {
            Meeting meeting = optionalMeeting.get();

            if (meeting.isGuestAndMeetingConfirmed())
                throw new Exception("Meeting already confirmed");

            if (meeting.isRejectedByDean())
                throw new Exception("Cannot accept previously rejected meeting");

            meeting.setGuestAndMeetingConfirmed(true);

            meetingRepository.save(meeting);
        } else {
            throw new Exception("No meeting associated with provided token exists");
        }
    }

    public ResponseEntity<String> rejectMeetingChanges(UUID meetingId) {
        try {
            meetingRepository.deleteById(meetingId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
