package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.dto.DepartmentDeanDutiesDto;
import com.iww.deanmeetingreservations.dto.DepartmentDto;

import java.util.List;
import java.util.UUID;

public interface DepartmentsService {
    List<DepartmentDto> getAllDepartments();
    List<DepartmentDeanDutiesDto> getDeansWithOfficeHours(UUID id);
}
