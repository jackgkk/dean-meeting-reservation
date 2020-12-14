package com.iww.deanmeetingreservations.controller;

import com.iww.deanmeetingreservations.service.DeanMeetingPropositionsManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
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

    @GetMapping("/counter-propose-meeting/{id}")
    ResponseEntity<String> counterProposeMeeting(@PathVariable UUID id, @RequestParam(required = false) String date, @RequestParam(required = false) Integer duration) {
        try {
            LocalDateTime newDateTime = null;

            if (date != null)
                newDateTime = LocalDateTime.parse(date, DateTimeFormatter.ofPattern("yyyy/MM/dd/HH:mm"));

            if (duration == null)
                duration = 0;

            return deanMeetingPropositionsManagementService.suggestChangesToMeeting(id, newDateTime, duration);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
