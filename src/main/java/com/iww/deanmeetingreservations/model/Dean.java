package com.iww.deanmeetingreservations.model;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "DEANS")
public class Dean {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "DEAN_ID")
    private String deanId;

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
    private List<DeanDepartment> dean_departments = new ArrayList<DeanDepartment>();

    public Dean() {
    }

    public Dean(String dean_id, String username, String password, String firstname, String lastname, String email) {
        this.deanId = dean_id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    public Dean(String username, String password, String firstname, String lastname, String email) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    public String getDeanId() {
        return deanId;
    }

    public void setDeanId(String dean_id) {
        this.deanId = dean_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    @JsonIgnore
    public List<DeanDepartment> getDean_departments() {
        return dean_departments;
    }

    public void setDean_departments(List<DeanDepartment> dean_departments) {
        this.dean_departments = dean_departments;
    }

    public void addDean_department(DeanDepartment deanDepartment){this.dean_departments.add(deanDepartment);}

    @JsonGetter("DepartmentNames")
    public List<String> getDepartmentsNames(){
        return dean_departments.stream().map(DeanDepartment :: getDepartmentName).collect(Collectors.toList());
    }
}
