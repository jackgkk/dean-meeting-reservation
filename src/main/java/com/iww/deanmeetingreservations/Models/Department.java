package com.iww.deanmeetingreservations.Models;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "DEPARTMENTS", schema = "TEST")
public class Department {

    @Id
    @Column(name = "DEPARTMENT_ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long department_id;

    @Basic
    @Column(name = "NAME", nullable = false)
    private String department_name;

    @Basic
    @Column(name = "ADDRESS", nullable = false)
    private String address;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Dean_department> dean_departments = new ArrayList<Dean_department>();

    public Department() {
    }

    public Department(Long department_id, String department_name, String address) {
        this.department_id = department_id;
        this.department_name = department_name;
        this.address = address;
    }

    public Long getDepartment_id() {
        return department_id;
    }

    public void setDepartment_id(Long department_id) {
        this.department_id = department_id;
    }

    public String getDepartment_name() {
        return department_name;
    }

    public void setDepartment_name(String department_name) {
        this.department_name = department_name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<Dean_department> getDean_departments() {
        return dean_departments;
    }

    public void setDean_departments(List<Dean_department> dean_departments) {
        this.dean_departments = dean_departments;
    }
}
