package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.config.JwtTokenUtil;
import com.iww.deanmeetingreservations.dto.DeanDto;
import com.iww.deanmeetingreservations.dto.DeanInfoDto;
import com.iww.deanmeetingreservations.dto.DutyDto;
import com.iww.deanmeetingreservations.dto.MeetingReturnDto;
import com.iww.deanmeetingreservations.model.Dean;
import com.iww.deanmeetingreservations.model.DeanDepartment;
import com.iww.deanmeetingreservations.model.Department;
import com.iww.deanmeetingreservations.model.Meeting;
import com.iww.deanmeetingreservations.repository.DeanDepartmentRepository;
import com.iww.deanmeetingreservations.repository.DeanRepository;
import com.iww.deanmeetingreservations.repository.DepartmentRepository;
import com.iww.deanmeetingreservations.repository.MeetingRepository;
import com.iww.deanmeetingreservations.model.Duty;
import com.iww.deanmeetingreservations.repository.DutyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DeanInfoServiceImpl implements DeanInfoService {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private DeanRepository deanRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private DeanDepartmentRepository deanDepartmentRepository;

    @Autowired
    private DeanService deanService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private DutyRepository dutyRepository;

    @Autowired
    MeetingRepository meetingRepository;

    @Override
    public void updateProfile(DeanDto deanDto, String id, String token) {
        Optional<Dean> dean = deanRepository.findById(UUID.fromString(id));
        token = token.substring(7);
        if (dean.isPresent()) {
            if(jwtTokenUtil.validateToken(token, deanService.loadUserByUsername(dean.get().getEmail()))){
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
                    deanModel.setPassword(bCryptPasswordEncoder.encode(deanDto.getPassword()));
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
                if (deanDto.getDuties()!=null) {
                    deanModel.replaceDuties(
                            deanDto.getDuties()
                                    .stream()
                                    .map(d -> new Duty(d.getDayOfWeek(), d.getBegins(), d.getEnds()))
                                    .collect(Collectors.toList()));
                }
                deanRepository.saveAndFlush(deanModel);
            }
        } else {
            throw new ResourceNotFoundException();
        }
    }

    @Override
    public DeanInfoDto findUserById(UUID id, String token) {
        Optional<Dean> dean = deanRepository.findById(id);
        token = token.substring(7);
        if (dean.isPresent()) {
            if(jwtTokenUtil.validateToken(token, deanService.loadUserByUsername(dean.get().getEmail()))){
                return new DeanInfoDto(dean.get().getFirstname(), dean.get().getLastname(), dean.get().getEmail(),
                        dean.get().getDuties().stream().map(duty ->
                                new DutyDto(duty.getDayOfTheWeek(), duty.getStartsAt(), duty.getEndsAt()))
                                .collect(Collectors.toList()));
            }
            throw new SecurityException();
        } else {
            throw new ResourceNotFoundException();
        }
    }

    @Override
    public void deleteByDutyId(String dutyId, String token) throws BadCredentialsException,ResourceNotFoundException {
        token = token.substring(7);
        if(!dutyRepository.existsById(dutyId))
            throw new ResourceNotFoundException("No duty with given id");
        if(!dutyRepository.findById(dutyId).get().getDeanEmail().equals(jwtTokenUtil.getEmailFromToken(token)))
            throw new BadCredentialsException("Can't delete someone else's duty");
        dutyRepository.deleteById(dutyId);
    }

    @Override
    public List<MeetingReturnDto> getConfirmedMeetings(String email, boolean accepted) {

        return meetingRepository.getAllByDeanEmail(email)
                .stream()
                .filter(Meeting::isGuestAndMeetingConfirmed)
                .filter(meeting -> !meeting.isRejectedByDean())/*
                .filter(meeting -> meeting.isAcceptedByDean() == accepted)*/
                .map(Meeting::getReturnDto)
                .collect(Collectors.toUnmodifiableList());
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
