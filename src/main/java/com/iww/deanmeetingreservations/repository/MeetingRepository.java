package com.iww.deanmeetingreservations.repository;

import com.iww.deanmeetingreservations.model.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, UUID> {
    Optional<Meeting> findByGuestVerificationToken(String token);
}
