package com.iww.deanmeetingreservations.repository;

import com.iww.deanmeetingreservations.model.Duty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DutyRepository extends JpaRepository<Duty,String> {
}
