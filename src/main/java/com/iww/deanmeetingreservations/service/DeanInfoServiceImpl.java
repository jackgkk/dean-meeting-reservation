package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.config.JwtTokenUtil;
import com.iww.deanmeetingreservations.dto.DeanDto;
import com.iww.deanmeetingreservations.dto.DeanInfoDto;
import com.iww.deanmeetingreservations.model.Dean;
import com.iww.deanmeetingreservations.model.DeanDepartment;
import com.iww.deanmeetingreservations.model.Department;
import com.iww.deanmeetingreservations.model.Duty;
import com.iww.deanmeetingreservations.repository.DeanDepartmentRepository;
import com.iww.deanmeetingreservations.repository.DeanRepository;
import com.iww.deanmeetingreservations.repository.DepartmentRepository;
import com.iww.deanmeetingreservations.repository.DutyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DeanInfoServiceImpl implements DeanInfoService {

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

    @Override
    public void updateProfile(DeanDto deanDto, String id, String token) {
        Optional<Dean> dean = deanRepository.findById(id);
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
                if (deanDto.getDuties()!=null) {
                    Duty newDuty;
                    for (Duty d : deanDto.getDuties()) {
                        newDuty = new Duty(d.getDayOfTheWeek(), d.getStartsAt(), d.getEndsAt());
                        deanModel.addDuty(newDuty);
                    }
                }
                deanRepository.saveAndFlush(deanModel);
            }
        } else {
            throw new ResourceNotFoundException();
        }
    }

    @Override
    public DeanInfoDto findUserById(String id, String token) {
        Optional<Dean> dean = deanRepository.findById(id);
        token = token.substring(7);
        if (dean.isPresent()) {
            if(jwtTokenUtil.validateToken(token, deanService.loadUserByUsername(dean.get().getEmail()))){
                return new DeanInfoDto(dean.get().getFirstname(), dean.get().getLastname(), dean.get().getEmail(), dean.get().getDuties());
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
}
