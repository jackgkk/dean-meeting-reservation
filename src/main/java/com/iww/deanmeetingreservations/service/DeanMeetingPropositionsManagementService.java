package com.iww.deanmeetingreservations.service;

import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

public interface DeanMeetingPropositionsManagementService {
    ResponseEntity<String> acceptMeeting(UUID meetingId);
    ResponseEntity<String> rejectMeeting(UUID meetingId);
    ResponseEntity<String> suggestChangesToMeeting(UUID meetingId, LocalDateTime newDateTime, int duration, String hostUrl);
    void sendEmailMeetingConfirmedOrRejectedByDean(String[] messageContent, String emailAddress, String emailTemplate) throws IOException;
}
