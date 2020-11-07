package com.iww.deanmeetingreservations.Repositories;

import com.iww.deanmeetingreservations.Models.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
