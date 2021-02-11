package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.dto.MeetingPropositionDto;
import com.iww.deanmeetingreservations.model.Meeting;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.UUID;

public interface MeetingPropositionService {
    Meeting addMeeting(MeetingPropositionDto meetingPropositionDto, String hostUrl) throws Exception;
    void sendConfirmationEmail(String messageContent, String emailAddress) throws IOException;
    void confirmMeeting(String id) throws Exception;
    ResponseEntity<String> rejectMeetingChanges(UUID meetingId);
}
