package com.iww.deanmeetingreservations.controller;

import com.iww.deanmeetingreservations.dto.MeetingPropositionDto;
import com.iww.deanmeetingreservations.model.Dean;
import com.iww.deanmeetingreservations.model.Guest;
import com.iww.deanmeetingreservations.model.Meeting;
import com.iww.deanmeetingreservations.repository.DeanRepository;
import com.iww.deanmeetingreservations.repository.MeetingRepository;
import com.iww.deanmeetingreservations.service.MeetingPropositionService;
import com.iww.deanmeetingreservations.service.MeetingPropositionServiceImpl;
import org.hibernate.engine.spi.SessionDelegatorBaseImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class MeetingCreationController {

    @Autowired
    MeetingPropositionService meetingPropositionService;

    @Autowired
    DeanRepository deanRepository;

    @GetMapping("/hello")
    public String sayHello() {
        Optional<Dean> dean = deanRepository.findById(UUID.fromString("82cfb68d-9019-4b2a-af69-22ca93889ccb"));

        if (dean.isPresent()) {
            System.out.println(dean.get());
        } else {
            System.out.println("Not found!");

            Dean newDean1 = new Dean(UUID.randomUUID(), "Twentone", "Mee6Koowoo", "Izabella", "Nowakowska", "izabella.nowakowska@wmii.uni.lodz.pl");
            deanRepository.save(newDean1);
            /* Dean newDean2 = new Dean(UUID.randomUUID(), d.getUsername(), d.getPassword(), d.getFirstname(), d.getLastname(), d.getEmail());
            deanRepository.save(newDean2);
            Dean newDean3 = new Dean(UUID.randomUUID(), d.getUsername(), d.getPassword(), d.getFirstname(), d.getLastname(), d.getEmail());
            deanRepository.save(newDean3);
            Dean newDean4 = new Dean(UUID.randomUUID(), d.getUsername(), d.getPassword(), d.getFirstname(), d.getLastname(), d.getEmail());
            deanRepository.save(newDean4);
            Dean newDean5 = new Dean(UUID.randomUUID(), d.getUsername(), d.getPassword(), d.getFirstname(), d.getLastname(), d.getEmail());
            deanRepository.save(newDean5);
            */
        }

        return "Hello, world!";
    }

    @PostMapping("/meeting/create-proposition")
    void newMeeting(HttpServletRequest request, @RequestBody MeetingPropositionDto meetingProposition) {
        String referer = request.getHeader("referer");

        try {
            URL refererUrl = new URL(referer);

            System.out.println(refererUrl.getProtocol() + "://" + refererUrl.getAuthority());
        } catch (MalformedURLException e) {
            System.out.println(e.getMessage());
        }

        try {
            URL refererUrl = new URL(referer);

            String hostUrl  = refererUrl.getProtocol() + "://" + refererUrl.getAuthority();

             meetingPropositionService.addMeeting(meetingProposition, hostUrl);
        } catch (Exception e) {
            System.out.println("Service failed: " + e);
        }
    }

    @GetMapping("/meeting/confirm-meeting/{confirmationToken}")
    ResponseEntity<String> confirmMeeting(@PathVariable String confirmationToken) {
        try {
            meetingPropositionService.confirmMeeting(confirmationToken);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}

class MeetingForm {
    Guest guest;
    UUID deanId;
    String description;
    String beginsAt;
    int duration;
    boolean isOnline;

    public MeetingForm(Guest guest, UUID deanId, String description, String beginsAt, int duration, boolean isOnline) {
        this.guest = guest;
        this.deanId = deanId;
        this.description = description;
        this.beginsAt = beginsAt;
        this.duration = duration;
        this.isOnline = isOnline;
    }
}