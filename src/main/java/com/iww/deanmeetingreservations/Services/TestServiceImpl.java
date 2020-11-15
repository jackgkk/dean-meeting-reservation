package com.iww.deanmeetingreservations.Services;

// implementations for service methods

import com.iww.deanmeetingreservations.Models.TestModel;
import com.iww.deanmeetingreservations.Repositories.TestModelRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class TestServiceImpl implements TestService{

    @Autowired
    TestModelRepository testModelRepository;

    @Override
    public void printTest() {
        TestModel test = testModelRepository.getFirstByTestStringIsLikeIgnoreCase("%tEs%").
                orElse(null);
        System.out.println(test == null ? "empty" : test.toString());
    }
}
