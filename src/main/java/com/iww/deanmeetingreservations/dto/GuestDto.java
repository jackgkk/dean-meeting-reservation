package com.iww.deanmeetingreservations.dto;

public class GuestDto {
    String name;
    String surname;
    String email;
    String status;

    public GuestDto(String name, String surname, String email, String status) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}