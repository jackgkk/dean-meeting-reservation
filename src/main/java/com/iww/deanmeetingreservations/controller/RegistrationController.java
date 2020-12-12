package com.iww.deanmeetingreservations.controller;

import com.iww.deanmeetingreservations.dto.RegistrationForm;
import com.iww.deanmeetingreservations.exceptions.ResourceAlreadyExistsError;
import com.iww.deanmeetingreservations.model.Dean;
import com.iww.deanmeetingreservations.service.DeanService;
import org.apache.coyote.Response;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import java.text.ParseException;

@Controller
public class RegistrationController {

    @Autowired
    DeanService deanService;

    Logger logger = LoggerFactory.getLogger(RegistrationController.class);

    @RequestMapping(value = "/api/dean/register",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Dean> registerRequest(@Valid @RequestBody RegistrationForm registrationForm) {
        try {
            Dean dean = deanService.saveDeanThroughForm(registrationForm);
            return ResponseEntity.ok(dean);
        }catch(ResourceAlreadyExistsError e){
            logger.info(e.getMessage() + " " + registrationForm.toString(),e);
            throw e;
        }
    }

    @RequestMapping(value = "/api/dean/isExist/{email}",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Boolean> checkExistByEmail(@PathVariable("email") String email){
        return ResponseEntity.ok(deanService.checkExistsByEmail(email));
    }
}
