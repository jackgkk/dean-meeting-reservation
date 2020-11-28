package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.dto.DeanDto;
import com.iww.deanmeetingreservations.dto.mapper.DeanMapper;
import com.iww.deanmeetingreservations.model.Dean;
import com.iww.deanmeetingreservations.repository.DeanRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DeanInfoServiceImpl implements DeanInfoService {

    @Autowired
    DeanRepository deanRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public DeanDto updateProfile(DeanDto deanDto, String id) {
        Optional<Dean> dean = deanRepository.findById(id);
        if (dean.isPresent()) {
            Dean deanModel = dean.get();
            deanModel.setFirstname(deanDto.getFirstname());
            deanModel.setLastname(deanDto.getLastname());
            deanModel.setEmail(deanDto.getEmail());
            return DeanMapper.toDeanDto(deanRepository.save(deanModel));
        }
        return null;
    }

    @Override
    public DeanDto changePassword(DeanDto deanDto, String newPassword) {
        return null;
    }

    @Override
    public DeanDto findUserById(String id) {
        Optional<Dean> dean = deanRepository.findById(id);
        if (dean.isPresent()) {
            return modelMapper.map(dean.get(), DeanDto.class);
        }
        return null;
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
