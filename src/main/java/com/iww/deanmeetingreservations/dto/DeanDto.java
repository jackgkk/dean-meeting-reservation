package com.iww.deanmeetingreservations.dto;

import com.iww.deanmeetingreservations.model.Duty;

import java.util.List;

public class DeanDto {

    private String firstname;

    private String lastname;

    private String email;

    private String password;

    private String department;

    private List<Duty> duties;

    public DeanDto(String firstname, String lastname, String email, String password, String department) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.department = department;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public List<Duty> getDuties() {
        return duties;
    }

    public void setDuties(List<Duty> duties) {
        this.duties = duties;
    }
}
