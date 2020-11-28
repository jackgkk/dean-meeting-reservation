package com.iww.deanmeetingreservations.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    private String departmentId;

    @Basic
    @Column(name = "NAME", nullable = false)
    private String departmentName;

    @Basic
    @Column(name = "ADDRESS", nullable = false)
    private String address;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<DeanDepartment> dean_departments = new ArrayList<DeanDepartment>();

    public Department() {
    }

    public Department(String department_id, String department_name, String address) {
        this.departmentId = department_id;
        this.departmentName = department_name;
        this.address = address;
    }

    public Department(String department_name, String address) {
        this.departmentName = department_name;
        this.address = address;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String department_id) {
        this.departmentId = department_id;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String department_name) {
        this.departmentName = department_name;
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

    public void addDean_department(DeanDepartment deanDepartment){this.dean_departments.add(deanDepartment);}
}
