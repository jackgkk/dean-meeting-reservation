package com.iww.deanmeetingreservations.controller;

import com.iww.deanmeetingreservations.dto.DeanLoginDto;
import com.iww.deanmeetingreservations.service.DeanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class DeanLoginController {

    @Autowired
    private DeanService deanService;

    @RequestMapping(value = "/api/dean/login", method = RequestMethod.POST)
    public ResponseEntity login(@RequestBody DeanLoginDto deanLoginDto) throws AuthenticationException {
        return ResponseEntity.ok(deanService.loginDean(deanLoginDto));
    }

    @RequestMapping(value = "/api/dean/isLogged", method = RequestMethod.GET)
    public ResponseEntity isLogged(@RequestHeader ("Authorization") String token) {
        try {
            return ResponseEntity.ok(deanService.isLogged(token));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
