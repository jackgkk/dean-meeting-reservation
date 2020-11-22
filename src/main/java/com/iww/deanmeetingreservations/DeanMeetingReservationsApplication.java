package com.iww.deanmeetingreservations;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class DeanMeetingReservationsApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeanMeetingReservationsApplication.class, args);
	}

}
