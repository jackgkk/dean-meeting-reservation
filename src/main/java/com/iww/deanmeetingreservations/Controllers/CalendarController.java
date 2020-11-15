package com.iww.deanmeetingreservations.Controllers;

import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.HttpMediaTypeException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Controller
public class CalendarController {

    public class MockGuest {
        String name,surname,email,status;

        public MockGuest(String name, String surname, String email, String status) {
            this.name = name;
            this.surname = surname;
            this.email = email;
            this.status = status;
        }


        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            MockGuest mockGuest = (MockGuest) o;
            return name.equals(mockGuest.name) &&
                    surname.equals(mockGuest.surname) &&
                    email.equals(mockGuest.email) &&
                    status.equals(mockGuest.status);
        }

        @Override
        public int hashCode() {
            return Objects.hash(name, surname, email, status);
        }

        public String getName() {
            return name;
        }

        public String getSurname() {
            return surname;
        }

        public String getEmail() {
            return email;
        }

        public String getStatus() {
            return status;
        }
    }

    public class MockReturn {
        String id,description,date;
        Double duration;
        Boolean isOnlineMeeting;
        MockGuest guest;

        public MockReturn(String id, String description, String date, Double duration, Boolean isOnlineMeeting, MockGuest guest) {
            this.id = id;
            this.description = description;
            this.date = date;
            this.duration = duration;
            this.isOnlineMeeting = isOnlineMeeting;
            this.guest = guest;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof MockReturn)) return false;
            MockReturn that = (MockReturn) o;
            return id.equals(that.id) &&
                    description.equals(that.description) &&
                    date.equals(that.date) &&
                    duration.equals(that.duration) &&
                    isOnlineMeeting.equals(that.isOnlineMeeting) &&
                    guest.equals(that.guest);
        }

        @Override
        public int hashCode() {
            return Objects.hash(id, description, date, duration, isOnlineMeeting, guest);
        }

        public String getId() {
            return id;
        }

        public String getDescription() {
            return description;
        }

        public String getDate() {
            return date;
        }

        public Double getDuration() {
            return duration;
        }

        public Boolean getOnlineMeeting() {
            return isOnlineMeeting;
        }

        public MockGuest getGuest() {
            return guest;
        }
    }

    //page implementation for get-confirmed-meetings

    /*@RequestMapping(value = "/api/dean/calendar/get-confirmed-meetings", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Page<MockReturn>> getMockup(Pageable pageable) {

        Page<MockReturn> page = new PageImpl<MockReturn>(Arrays.asList(
                new MockReturn("UUID1","MockDescription1","01.01.2021",15.5, true,
                        new MockGuest("Jan","Paweł","JP@acab.pl","Mock_Status1")),
                new MockReturn("UUID2","MockDescription2","02.01.2021",10.0, false,
                        new MockGuest("Beta","Orbiter","BO@email.com","Mock_Status2"))),pageable,2);

        return new ResponseEntity(page,HttpStatus.OK);
    }*/

    @RequestMapping(value = "/api/dean/calendar/get-confirmed-meetings", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<MockReturn>> getMockup() {

        List<MockReturn> list = new ArrayList<>(List.of(new MockReturn("UUID1","MockDescription1","01.01.2021",15.5, true,
                        new MockGuest("Jan","Paweł","JP@acab.pl","Mock_Status1")),
                new MockReturn("UUID2","MockDescription2","02.01.2021",10.0, false,
                        new MockGuest("Beta","Orbiter","BO@email.com","Mock_Status2"))));
        return new ResponseEntity(list,HttpStatus.OK);
    }

    @RequestMapping(value = "/api/dean/calendar/cancel-meeting/{id}",
            method = RequestMethod.DELETE)
    @ResponseStatus(code = HttpStatus.OK)
    public void mockDelete(@PathVariable("id") final UUID id) {
        if(id.hashCode()%2==0)
            throw new ResponseStatusException(HttpStatus.I_AM_A_TEAPOT);
    }
}
