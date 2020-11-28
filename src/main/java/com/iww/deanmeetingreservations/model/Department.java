package com.iww.deanmeetingreservations.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "DEPARTMENTS")
public class Department {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "DEPARTMENT_ID")
    private UUID department_id;

    @Basic
    @Column(name = "NAME", nullable = false)
    private String department_name;

    @Basic
    @Column(name = "ADDRESS", nullable = false)
    private String address;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<DeanDepartment> dean_departments = new ArrayList<DeanDepartment>();

    public Department() {
    }

    public Department(UUID department_id, String department_name, String address) {
        this.department_id = department_id;
        this.department_name = department_name;
        this.address = address;
    }

    public UUID getDepartment_id() {
        return department_id;
    }

    public void setDepartment_id(UUID department_id) {
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

    public List<DeanDepartment> getDean_departments() {
        return dean_departments;
    }

    public void setDean_departments(List<DeanDepartment> dean_departments) {
        this.dean_departments = dean_departments;
    }
}
