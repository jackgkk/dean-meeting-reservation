package com.iww.deanmeetingreservations.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "DEANS", schema = "TEST")
public class Dean {

    @Id
    @Column(name = "DEAN_ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long dean_id;

    @Basic
    @Column(name = "USERNAME", unique = true, nullable = false)
    private String username;

    @Basic
    @Column(name = "PASSWORD", nullable = false)
    @JsonIgnore
    private String password;

    @Basic
    @Column(name = "FIRSTNAME", nullable = false)
    private String firstname;

    @Basic
    @Column(name = "LASTNAME", nullable = false)
    private String lastname;

    @Basic
    @Column(name = "EMAIL", unique = true, nullable = false)
    private String email;

    @OneToMany(mappedBy = "dean", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Dean_department> dean_departments = new ArrayList<Dean_department>();

    public Dean() {
    }

    public Dean(Long dean_id, String username, String password, String firstname, String lastname, String email) {
        this.dean_id = dean_id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    public Long getDean_id() {
        return dean_id;
    }

    public void setDean_id(Long dean_id) {
        this.dean_id = dean_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public List<Dean_department> getDean_departments() {
        return dean_departments;
    }

    public void setDean_departments(List<Dean_department> dean_departments) {
        this.dean_departments = dean_departments;
    }
}
