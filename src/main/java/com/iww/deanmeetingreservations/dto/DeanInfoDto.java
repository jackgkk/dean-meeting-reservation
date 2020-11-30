package com.iww.deanmeetingreservations.dto;

import com.iww.deanmeetingreservations.model.DutyDean;

import java.util.ArrayList;
import java.util.List;

public class DeanInfoDto {

    private String firstname;

    private String lastname;

    private String email;

    private List<DutyDean> dutyDeans = new ArrayList<DutyDean>();

    public DeanInfoDto() {
    }

    public DeanInfoDto(String firstname, String lastname, String email, List<DutyDean> dutyDeans) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.dutyDeans = dutyDeans;
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

    public List<DutyDean> getDutyDeans() {
        return dutyDeans;
    }

    public void setDutyDeans(List<DutyDean> dutyDeans) {
        this.dutyDeans = dutyDeans;
    }
}
