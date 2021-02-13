package com.iww.deanmeetingreservations.controller;

import com.iww.deanmeetingreservations.dto.DepartmentDto;
import com.iww.deanmeetingreservations.model.Department;
import com.iww.deanmeetingreservations.repository.DepartmentRepository;
import com.iww.deanmeetingreservations.service.DepartmentsService;
import com.iww.deanmeetingreservations.service.DepartmentsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/departments")
public class DepartmentsController {
    @Autowired
    private DepartmentsServiceImpl departmentsService;

    @GetMapping("/all")
    public ResponseEntity<List<DepartmentDto>> getDepartmentsList() {
        try {
            List<DepartmentDto> departments = departmentsService.getAllDepartments();

            return new ResponseEntity<>(departments, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
