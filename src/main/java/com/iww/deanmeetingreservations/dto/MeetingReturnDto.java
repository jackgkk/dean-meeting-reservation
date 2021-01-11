package com.iww.deanmeetingreservations.dto;

public class MeetingReturnDto {

    String id;
    String description;
    String date;
    int duration;
    private class MRDtoGuest{
        String name;
        String surname;
        String email;
        String status;

        public MRDtoGuest(String name, String surname, String email, String status) {
            this.name = name;
            this.surname = surname;
            this.email = email;
            this.status = status;
        }

        public String getName() {
            return name;
        }

        public String getSurname() {
            return surname;
        }

        public String getEmail() {
            return email;
        }

        public String getStatus() {
            return status;
        }
    }
    MRDtoGuest guest;
    boolean isOnlineMeeting;

    public MeetingReturnDto(String id, String description, String date, int duration,
            String name,String surname,String email,String status, boolean isOnlineMeeting) {
        this.id = id;
        this.description = description;
        this.date = date;
        this.duration = duration;
        this.guest = new MRDtoGuest(name, surname, email, status);
        this.isOnlineMeeting = isOnlineMeeting;
    }



    public MRDtoGuest getGuest() {
        return guest;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public boolean isOnlineMeeting() {
        return isOnlineMeeting;
    }

    public void setOnlineMeeting(boolean onlineMeeting) {
        isOnlineMeeting = onlineMeeting;
    }
}
