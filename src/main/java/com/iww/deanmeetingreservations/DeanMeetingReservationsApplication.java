package com.iww.deanmeetingreservations;

import com.iww.deanmeetingreservations.Models.*;
import com.iww.deanmeetingreservations.Repositories.TestModelRepository;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DeanMeetingReservationsApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeanMeetingReservationsApplication.class, args);
	}

	/*@Bean
	public CommandLineRunner run(TestModelRepository testModelRepository) throws Exception {
		return (String[] args) -> {
			TestModel testModel1 = new TestModel("test");
			TestModel testModel2 = new TestModel("test");
			testModelRepository.save(testModel1);
			testModelRepository.save(testModel2);
			testModelRepository.findAll().forEach(user -> System.out.println(user));
		};
	}*/

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
}
