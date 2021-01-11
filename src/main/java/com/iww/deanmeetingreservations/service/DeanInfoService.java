package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.dto.DeanDto;
import com.iww.deanmeetingreservations.dto.DeanInfoDto;
import com.iww.deanmeetingreservations.dto.MeetingReturnDto;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.access.AccessDeniedException;

import java.util.List;
import java.util.UUID;

public interface DeanInfoService {
    List<MeetingReturnDto> getConfirmedMeetings(String email, boolean accepted);
    void deleteMeeting(UUID meetingId,String email) throws ResourceNotFoundException, AccessDeniedException;
    void updateProfile(DeanDto deanDto, String id, String token);
    DeanInfoDto findUserById(String id, String token);
    void deleteByDutyId(String dutyId, String email);
}
