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
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
        String deanId = meetingPropositionDto.getDeanId().toString();

        Optional<Dean> dean = deanRepository.findById(deanId);

        String guestVerificationToken = UUID.randomUUID().toString().replace("-", "");

        String confirmationLink = hostUrl.concat("/confirm-meeting/").concat(guestVerificationToken);


        System.out.println(confirmationLink);


        GuestDto guestDto = meetingPropositionDto.getGuest();

        String guestEmail = guestDto.getEmail();

        sendConfirmationEmail(confirmationLink, guestEmail);

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
            UUID id = UUID.randomUUID();

            guest = new Guest(id, name, surname, guestEmail, status);

            guestRepository.save(guest);
        }

        String meetingDescription = meetingPropositionDto.getDescription();
        String meetingBeginsAtHour = meetingPropositionDto.getBeginsAt();
        int meetingDuration = meetingPropositionDto.getDuration();
        boolean isMeetingOnline = meetingPropositionDto.isOnline();


        int meetingBeginsAtHours = Integer.parseInt(meetingBeginsAtHour.substring(0, meetingBeginsAtHour.indexOf(':')));
        int meetingBeginsAtMinutes = Integer.parseInt(meetingBeginsAtHour.substring(meetingBeginsAtHour.indexOf(':') + 1));

        LocalDateTime meetingBeginsAt = LocalDate.now().atTime(meetingBeginsAtHours, meetingBeginsAtMinutes);

        Meeting meeting = new Meeting(
                UUID.randomUUID(), guest, dean.get(),
                meetingDescription, meetingBeginsAt,
                meetingDuration, isMeetingOnline,
                guestVerificationToken);

        meetingRepository.save(meeting);

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

        mail.setTemplateId(System.getenv("TEMPLATE_ID"));

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
    public void confirmMeeting(String confirmationToken) throws Exception {
        meetingRepository.flush();

        Optional<Meeting> optionalMeeting = meetingRepository.findByGuestVerificationToken(confirmationToken);

        if (optionalMeeting.isPresent()) {
            Meeting meeting = optionalMeeting.get();

            meeting.setGuestAndMeetingConfirmed(true);

            meetingRepository.save(meeting);
        } else {
            throw new Exception("No meeting associated with provided token exists");
        }
    }
}
