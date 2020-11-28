package com.iww.deanmeetingreservations.repository;

import com.iww.deanmeetingreservations.model.DeanDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DeanDepartmentRepository extends JpaRepository<DeanDepartment, UUID> {
}
