package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.dto.DepartmentDto;
import com.iww.deanmeetingreservations.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
}
