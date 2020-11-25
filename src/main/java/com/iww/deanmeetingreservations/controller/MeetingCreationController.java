package com.iww.deanmeetingreservations.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class MeetingCreationController {
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, world!";
    }

    @PostMapping("/meeting/create-proposition")
    void newMeeting(@RequestBody MeetingForm meetingForm) {
        System.out.println("I've got: " + meetingForm.name + " and" + meetingForm.surname);
    }
}

class MeetingForm {
    String name;
    String surname;

    public MeetingForm(String name, String surname) {
        this.name = name;
        this.surname = surname;
    }
}