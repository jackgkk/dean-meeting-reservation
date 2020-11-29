package com.iww.deanmeetingreservations.repository;

import com.iww.deanmeetingreservations.model.Dean;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface DeanRepository extends JpaRepository<Dean, UUID> {
    Boolean existsByEmailEquals(String email);
    Boolean existsByUsernameEquals(String username);
    Optional<Dean> getFirstByUsernameEquals(String username);
}
