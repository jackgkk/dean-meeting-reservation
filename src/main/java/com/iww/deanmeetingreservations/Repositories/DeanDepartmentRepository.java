package com.iww.deanmeetingreservations.Repositories;

import com.iww.deanmeetingreservations.Models.Dean_department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeanDepartmentRepository extends JpaRepository<Dean_department, Long> {
}
