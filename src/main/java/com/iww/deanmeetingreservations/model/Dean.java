package com.iww.deanmeetingreservations.model;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
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
    @Column(name = "DEAN_ID", length = 36)
    private String deanId;

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
    private List<DeanDepartment> deanDepartments = new ArrayList<>();

    @OneToMany(mappedBy = "dean", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Duty> duties = new ArrayList<>();

    public Dean() {
    }

    public Dean(String deanId, String password, String firstname, String lastname, String email) {
        this.deanId = deanId;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    public Dean(String password, String firstname, String lastname, String email) {
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    public String getDeanId() {
        return deanId;
    }

    public void setDeanId(String deanId) {
        this.deanId = deanId;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonIgnore
    public List<DeanDepartment> getDeanDepartments() {
        return deanDepartments;
    }

    public void setDeanDepartments(List<DeanDepartment> deanDepartments) {
        this.deanDepartments = deanDepartments;
    }

    public List<Duty> getDuties() {
        return duties;
    }

    public void setDuties(List<Duty> duties) {
        this.duties = duties;
    }

    public void addDeanDepartment(DeanDepartment deanDepartment) {
        this.deanDepartments.add(deanDepartment);
    }

    public Collection<? extends GrantedAuthority> getRole() {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @JsonGetter("DepartmentNames")
    public List<String> getDepartmentsNames(){
        return deanDepartments.stream().map(DeanDepartment :: getDepartmentName).collect(Collectors.toList());
    }

    public void addDuty(Duty duty)
    {
        this.duties.add(duty);
        duty.setDean(this);
    }

}
