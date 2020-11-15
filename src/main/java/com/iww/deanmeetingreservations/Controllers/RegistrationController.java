package com.iww.deanmeetingreservations.Controllers;

import com.iww.deanmeetingreservations.DTO.RegistrationForm;
import org.apache.coyote.Response;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;

@Controller
public class RegistrationController {

    @Autowired
    ModelMapper modelMapper;


    //Return value is temporary, Convert DTO to Entity once available
    @RequestMapping(value = "/api/dean/register",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<RegistrationForm> registerRequest(@RequestBody @Valid RegistrationForm registrationForm){
        /*Meeting meeting = convertToEntity(registrationForm);
        meetingService.save(meeting);
        return new ResponseEntity<Meeting>(HttpStatus.ACCEPTED);*/
        return ResponseEntity.ok(registrationForm);
    }

    @RequestMapping(value = "/api/dean/isExist/{email}",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Boolean> checkExistByEmail(@PathVariable("email") String email){
        //meetingService.existsByEmail(email);
        if(email.hashCode()%2==0)
            return ResponseEntity.ok(false);
        return ResponseEntity.ok(true);
    }


    /*private Meeting convertToEntity(RegistrationForm registrationForm) throws ParseException {
        Meeting meeting = modelMapper.map(registrationForm,Meeting.class);
        return meeting;
    }*/
}
