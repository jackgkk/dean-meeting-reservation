package com.iww.deanmeetingreservations.model;

import com.iww.deanmeetingreservations.repository.DeanRepository;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "meetings")
public class Meeting {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guest_id")
    private Guest guest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dean_id")
    private Dean dean;

    @Column(name = "description")
    private String description;

    @Column(name = "begins_at")
    private LocalDateTime beginsAt;

    @Column(name = "duration")
    private int duration;

    @Column(name = "is_online")
    private boolean isOnline;

    private boolean acceptedByDean;

    private String guestVerificationToken;

    private boolean guestAndMeetingConfirmed;

    public Meeting() {}

    public Meeting(UUID id, Guest guest, Dean dean, String description, LocalDateTime beginsAt, int duration, boolean isOnline, String guestVerificationToken) {
        this.id = id;
        this.guest = guest;
        this.dean = dean;
        this.description = description;
        this.beginsAt = beginsAt;
        this.duration = duration;
        this.isOnline = isOnline;
        this.guestVerificationToken = guestVerificationToken;
    }

    public Meeting(UUID id, Guest guest, Dean dean, String description, LocalDateTime beginsAt, int duration, boolean isOnline, String guestVerificationToken, boolean guestAndMeetingConfirmed) {
        this.id = id;
        this.guest = guest;
        this.dean = dean;
        this.description = description;
        this.beginsAt = beginsAt;
        this.duration = duration;
        this.isOnline = isOnline;
        this.guestVerificationToken = guestVerificationToken;
        this.guestAndMeetingConfirmed = guestAndMeetingConfirmed;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Guest getGuest() {
        return guest;
    }

    public void setGuest(Guest guest) {
        this.guest = guest;
    }

    public Dean getDean() {
        return dean;
    }

    public void setDean(Dean dean) {
        this.dean = dean;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getBeginsAt() {
        return beginsAt;
    }

    public void setBeginsAt(LocalDateTime beginsAt) {
        this.beginsAt = beginsAt;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public boolean isOnline() {
        return isOnline;
    }

    public void setOnline(boolean online) {
        isOnline = online;
    }

    public void setGuestAndMeetingConfirmed(boolean guestAndMeetingConfirmed) {
        this.guestAndMeetingConfirmed = guestAndMeetingConfirmed;
    }

    public boolean isAcceptedByDean() {
        return acceptedByDean;
    }

    public String getGuestVerificationToken() {
        return guestVerificationToken;
    }

    public boolean isGuestAndMeetingConfirmed() {
        return guestAndMeetingConfirmed;
    }
}