package com.iww.deanmeetingreservations.repository;

import com.iww.deanmeetingreservations.model.DeanDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeanDepartmentRepository extends JpaRepository<DeanDepartment, Long> {
}
