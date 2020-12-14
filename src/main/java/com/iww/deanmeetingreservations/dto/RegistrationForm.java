package com.iww.deanmeetingreservations.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class RegistrationForm {

    @NotBlank
    String name;
    @NotBlank
    String surname;
    @Email(message = "email must be valid")
    String email;
    @Size(message = "password must be between 4 and 32 character long",min = 4,max = 32)
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

    @JsonAlias("firstname")
    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    @JsonAlias("lastname")
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

    @Override
    public String toString() {
        return "RegistrationForm{" +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                ", department='" + department + '\'' +
                '}';
    }
}


