package com.iww.deanmeetingreservations.controller;

import com.iww.deanmeetingreservations.DeanMeetingReservationsApplication;
import com.iww.deanmeetingreservations.dto.DeanDto;
import com.iww.deanmeetingreservations.service.DeanInfoService;
import com.iww.deanmeetingreservations.service.DeanInfoServiceImpl;
import javassist.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeanInfoController {

    private DeanInfoServiceImpl deanInfoService;

    private Logger logger= LoggerFactory.getLogger(DeanMeetingReservationsApplication.class);

    @GetMapping("/api/dean/{id}")
    public ResponseEntity<DeanDto> getDeanWithId (@PathVariable String id) throws ResourceNotFoundException {
        DeanDto deanDto;
        try {
            deanDto = deanInfoService.findUserById(id);
        } catch (ResourceNotFoundException e) {
            logger.error("No dean found with given id / @Get \"/api/dean/"+id+"\"");
            throw e;
        }
        return ResponseEntity.ok(deanDto);
    }
}
