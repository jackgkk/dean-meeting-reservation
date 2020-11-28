package com.iww.deanmeetingreservations.repository;

import com.iww.deanmeetingreservations.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, String> {
    Boolean existsByDepartmentNameEquals(String name);
    Optional<Department> getFirstByDepartmentNameEquals(String name);
}
