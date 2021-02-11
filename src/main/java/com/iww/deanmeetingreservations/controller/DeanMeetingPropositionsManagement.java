package com.iww.deanmeetingreservations.controller;

import com.iww.deanmeetingreservations.service.DeanMeetingPropositionsManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.net.URL;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@RestController
@RequestMapping("/api/dean")
public class DeanMeetingPropositionsManagement {
    @Autowired
    DeanMeetingPropositionsManagementService deanMeetingPropositionsManagementService;

    @GetMapping("/accept-meeting/{id}")
    ResponseEntity<String> acceptMeeting(@PathVariable UUID id) {
        return deanMeetingPropositionsManagementService.acceptMeeting(id);
    }

    @GetMapping("/reject-meeting/{id}")
    ResponseEntity<String> rejectMeeting(@PathVariable UUID id) {
        return deanMeetingPropositionsManagementService.rejectMeeting(id);
    }

    static class MeetingChanges {
        private String date;
        private Integer duration;

        public String getDate() {
            return date;
        }

        public Integer getDuration() {
            return duration;
        }
    }

    @PostMapping("/counter-propose-meeting/{id}")
    ResponseEntity<String> counterProposeMeeting(HttpServletRequest request, @PathVariable UUID id, @RequestBody MeetingChanges meetingChanges) {
        String referer = request.getHeader("referer");

        try {
            URL refererUrl = new URL(referer);
            String hostUrl  = refererUrl.getProtocol() + "://" + refererUrl.getAuthority();

            LocalDateTime newDateTime = null;

            String date = meetingChanges.getDate();
            Integer duration = meetingChanges.getDuration();

            if (date != null)
                newDateTime = LocalDateTime.parse(date, DateTimeFormatter.ofPattern("dd/MM/yyy/HH:mm"));

            if (duration == null)
                duration = 0;

            return deanMeetingPropositionsManagementService.suggestChangesToMeeting(id, newDateTime, duration, hostUrl);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
