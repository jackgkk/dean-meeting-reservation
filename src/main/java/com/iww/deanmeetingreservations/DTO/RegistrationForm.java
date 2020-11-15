package com.iww.deanmeetingreservations.DTO;

import javax.validation.constraints.NotBlank;

public class RegistrationForm {

    @NotBlank
    String name;
    @NotBlank
    String surname;
    @NotBlank
    String email;
    @NotBlank
    String password;
    @NotBlank
    String department;

    public RegistrationForm() {
    }

    public RegistrationForm(@NotBlank String name, @NotBlank String surname, @NotBlank String email, @NotBlank String password, @NotBlank String department) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.department = department;
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
}
