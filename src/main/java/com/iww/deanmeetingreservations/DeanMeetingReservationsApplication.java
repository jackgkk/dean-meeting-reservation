package com.iww.deanmeetingreservations;

import com.iww.deanmeetingreservations.model.Dean;
import com.iww.deanmeetingreservations.repository.DeanRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class DeanMeetingReservationsApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeanMeetingReservationsApplication.class, args);
	}
}
