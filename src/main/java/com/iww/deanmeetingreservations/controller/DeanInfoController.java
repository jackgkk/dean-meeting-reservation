package com.iww.deanmeetingreservations.controller;

import com.iww.deanmeetingreservations.DeanMeetingReservationsApplication;
import com.iww.deanmeetingreservations.dto.DeanDto;
import com.iww.deanmeetingreservations.dto.DeanInfoDto;
import com.iww.deanmeetingreservations.dto.MeetingReturnDto;
import com.iww.deanmeetingreservations.model.Meeting;
import com.iww.deanmeetingreservations.security.SecurityConstants;
import com.iww.deanmeetingreservations.service.DeanInfoServiceImpl;
import org.apache.tomcat.util.http.parser.Authorization;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.iww.deanmeetingreservations.security.SecurityConstants.HEADER_STRING;

@RestController
public class DeanInfoController {

    private final Logger logger = LoggerFactory.getLogger(DeanMeetingReservationsApplication.class);
    @Autowired
    private DeanInfoServiceImpl deanInfoService;

    @RequestMapping(value = "/api/dean/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<DeanInfoDto> getDeanWithId(@PathVariable("id") String id) throws ResourceNotFoundException {
        try {
            DeanInfoDto deanInfoDto = deanInfoService.findUserById(id);
            return ResponseEntity.ok(deanInfoDto);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/api/dean/update-info/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<String> updateDeanInfo(@PathVariable String id, @RequestBody DeanDto deanDto) throws ResourceNotFoundException {
        try {
            deanInfoService.updateProfile(deanDto, id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (HttpClientErrorException.BadRequest badRequest) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/api/dean/calendar/get-confirmed-meetings")
    public ResponseEntity<List<MeetingReturnDto>> getConfirmedMeetings(@RequestParam(name="only-accepted") Optional<Boolean> accepted,
                                                                       @RequestHeader(name = HEADER_STRING) String token){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return new ResponseEntity(deanInfoService.getConfirmedMeetings(authentication.getName(),
                accepted.isPresent()? accepted.get() : true),HttpStatus.OK);
    }

    @RequestMapping(value = "/api/dean/calendar/cancel-meeting/{id}",method = RequestMethod.DELETE)
    public ResponseEntity deleteMeeting(@PathVariable UUID id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try{
        deanInfoService.deleteMeeting(id,authentication.getName());
        }catch (ResourceNotFoundException e){
            logger.info(e.getClass().getName() + " " + e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.NOT_FOUND);
        }catch (AccessDeniedException e){
            logger.info(e.getClass().getName() + " " + e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
