package com.iww.deanmeetingreservations.dto;

import com.iww.deanmeetingreservations.model.Guest;
import java.util.Date;
import java.util.UUID;

public class MeetingPropositionDto {
    private UUID id;

    private GuestDto guest;

    private UUID deanId;

    private String description;

    private String beginsAt;

    private int duration;

    private boolean isOnline;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public GuestDto getGuest() {
        return guest;
    }

    public void setGuest(GuestDto guest) {
        this.guest = guest;
    }

    public UUID getDeanId() {
        return deanId;
    }

    public void setDeanId(UUID deanId) {
        this.deanId = deanId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBeginsAt() {
        return beginsAt;
    }

    public void setBeginsAt(String beginsAt) {
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
}
