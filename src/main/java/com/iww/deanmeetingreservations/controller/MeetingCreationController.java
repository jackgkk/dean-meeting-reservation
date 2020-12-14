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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    DeanRepository deanRepository;

    @GetMapping("/hello")
    public String sayHello() {
        Optional<Dean> dean = deanRepository.findById(UUID.fromString("b49b68b6-c7ec-4a50-8fea-00aa66d00941"));

        if (dean.isPresent()) {
            System.out.println(dean.get());
        } else {
            System.out.println("Not found!");

            Dean newDean1 = new Dean(UUID.randomUUID().toString(), bCryptPasswordEncoder.encode("test"), "Izabella", "Nowakowska", "izabella.nowakowska@wmii.uni.lodz.pl");
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
            String hostUrl  = refererUrl.getProtocol() + "://" + refererUrl.getAuthority();

             meetingPropositionService.addMeeting(meetingProposition, hostUrl);
        } catch (Exception e) {
            System.out.println("Service failed: " + e);
        }
    }

    @GetMapping("/meeting/confirm-meeting/{id}")
    ResponseEntity<String> confirmMeeting(@PathVariable String id) {
        try {
            meetingPropositionService.confirmMeeting(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}