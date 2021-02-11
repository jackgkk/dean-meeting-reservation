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
@RequestMapping("/api/meeting")
public class MeetingCreationController {

    @Autowired
    MeetingPropositionService meetingPropositionService;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    DeanRepository deanRepository;

    @PostMapping("/create-proposition")
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

    @GetMapping("/confirm-meeting/{id}")
    ResponseEntity<String> confirmMeeting(@PathVariable String id) {
        try {
            meetingPropositionService.confirmMeeting(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/reject-meeting-changes/{id}")
    ResponseEntity<String> rejectCounterProposeMeeting(@PathVariable UUID id) {
        return meetingPropositionService.rejectMeetingChanges(id);
    }
}