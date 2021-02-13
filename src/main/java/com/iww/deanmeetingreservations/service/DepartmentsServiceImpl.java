package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.dto.DepartmentDeanDutiesDto;
import com.iww.deanmeetingreservations.dto.DepartmentDto;
import com.iww.deanmeetingreservations.model.DeanDepartment;
import com.iww.deanmeetingreservations.model.Department;
import com.iww.deanmeetingreservations.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DepartmentsServiceImpl implements DepartmentsService {
    @Autowired
    DepartmentRepository departmentRepository;

    @Override
    public List<DepartmentDto> getAllDepartments() {
        return departmentRepository
                .findAll()
                .stream()
                .map(department -> new DepartmentDto(
                        department.getDepartmentId().toString(),
                        department.getDepartmentName()))
                .collect(Collectors.toList());
    }

    @Override
    public List<DepartmentDeanDutiesDto> getDeansWithOfficeHours(UUID id) {
        Department department = departmentRepository.findByDepartmentId(id);

        List<DepartmentDeanDutiesDto> temp = department.getDeanDepartments().stream().map(DeanDepartment::getDean)
                .map(dean ->
                        new DepartmentDeanDutiesDto(
                                dean.getDeanId().toString(),
                                dean.getFirstname(),
                                dean.getLastname(),
                                dean.getEmail(),
                                dean.getDuties()
                        )).collect(Collectors.toList());

        return temp;
    }
}
