package com.iww.deanmeetingreservations.Repositories;

import com.iww.deanmeetingreservations.Models.Dean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeanRepository extends JpaRepository<Dean, Long> {
}
