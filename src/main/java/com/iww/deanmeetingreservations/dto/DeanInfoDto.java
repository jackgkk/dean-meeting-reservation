package com.iww.deanmeetingreservations.dto;

import com.iww.deanmeetingreservations.model.Duty;

import java.util.ArrayList;
import java.util.List;

public class DeanInfoDto {

    private String firstname;

    private String lastname;

    private String email;

    private List<Duty> duties = new ArrayList<Duty>();

    public DeanInfoDto(String firstname, String lastname, String email, List<Duty> duties) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.duties = duties;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Duty> getDuties() {
        return duties;
    }

    public void setDuties(List<Duty> duties) {
        this.duties = duties;
    }
}
