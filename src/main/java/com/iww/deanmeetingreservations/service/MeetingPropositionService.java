package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.dto.MeetingPropositionDto;
import com.iww.deanmeetingreservations.model.Meeting;

import java.io.IOException;

public interface MeetingPropositionService {
    Meeting addMeeting(MeetingPropositionDto meetingPropositionDto, String hostUrl) throws Exception;
    void sendConfirmationEmail(String messageContent, String emailAddress) throws IOException;
    void confirmMeeting(String confirmationToken) throws Exception;
}
