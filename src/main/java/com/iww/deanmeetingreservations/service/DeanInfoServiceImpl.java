package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.dto.DeanDto;
import com.iww.deanmeetingreservations.dto.DeanInfoDto;
import com.iww.deanmeetingreservations.dto.MeetingReturnDto;
import com.iww.deanmeetingreservations.model.Dean;
import com.iww.deanmeetingreservations.model.DeanDepartment;
import com.iww.deanmeetingreservations.model.Department;
import com.iww.deanmeetingreservations.model.Meeting;
import com.iww.deanmeetingreservations.repository.DeanDepartmentRepository;
import com.iww.deanmeetingreservations.repository.DeanRepository;
import com.iww.deanmeetingreservations.repository.DepartmentRepository;
import com.iww.deanmeetingreservations.repository.MeetingRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DeanInfoServiceImpl implements DeanInfoService {

    @Autowired
    DeanRepository deanRepository;

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    DeanDepartmentRepository deanDepartmentRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    MeetingRepository meetingRepository;

    @Override
    public void updateProfile(DeanDto deanDto, String id) {
        Optional<Dean> dean = deanRepository.findById(id);
        if (dean.isPresent()) {
            Dean deanModel = dean.get();
            if (deanDto.getFirstname() != null) {
                deanModel.setFirstname(deanDto.getFirstname());
            }
            if (deanDto.getLastname() != null) {
                deanModel.setLastname(deanDto.getLastname());
            }
            if (deanDto.getEmail() != null) {
                deanModel.setEmail(deanDto.getEmail());
            }
            if (deanDto.getPassword() != null) {
                deanModel.setPassword(deanDto.getPassword());
            }
            if (deanDto.getDepartment() != null) {
                Department department = departmentRepository.getFirstByDepartmentNameEquals(deanDto.getDepartment()).orElse(null);
                if (department == null) {
                    department = new Department(deanDto.getDepartment());
                    departmentRepository.save(department);
                    departmentRepository.flush();
                    department = departmentRepository.getFirstByDepartmentNameEquals(deanDto.getDepartment()).get();
                }
                DeanDepartment deanDepartment = new DeanDepartment(deanModel, department);
                deanModel.addDeanDepartment(deanDepartment);
                department.addDeanDepartment(deanDepartment);
                deanDepartmentRepository.saveAndFlush(deanDepartment);
                departmentRepository.saveAndFlush(department);
            }
            deanRepository.saveAndFlush(deanModel);
        } else {
            throw new ResourceNotFoundException();
        }
    }

    @Override
    public DeanInfoDto findUserById(String id) {
        Optional<Dean> dean = deanRepository.findById(id);
        if (dean.isPresent()) {
            return new DeanInfoDto(dean.get().getFirstname(), dean.get().getLastname(), dean.get().getEmail(), dean.get().getDuties());
        } else {
            throw new ResourceNotFoundException();
        }
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Override
    public List<MeetingReturnDto> getConfirmedMeetings(String email, boolean accepted) {
        return meetingRepository.getAllByDeanEmailEqualsAndConfirmedEquals(email,accepted).stream().
                map(Meeting::getReturnDto).collect(Collectors.toUnmodifiableList());
    }

    @Override
    public void deleteMeeting(UUID meetingId, String email) throws ResourceNotFoundException, AccessDeniedException {
        Optional<Meeting> meeting = meetingRepository.findById(meetingId);
        if(!meeting.isPresent())
            throw new ResourceNotFoundException("No meeting with given id was found");
        if(!meeting.get().getDean().getEmail().equals(email))
            throw new org.springframework.security.access.AccessDeniedException("Stop right there criminal scum!");
        meeting = null;
        meetingRepository.deleteById(meetingId);
    }
}
