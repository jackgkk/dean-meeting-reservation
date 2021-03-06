package com.iww.deanmeetingreservations.repository;

import com.iww.deanmeetingreservations.model.Dean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

import java.util.Optional;

@Repository
public interface DeanRepository extends JpaRepository<Dean, UUID> {
    Dean findByEmail (String email);
    Boolean existsByEmailEquals(String email);
}
