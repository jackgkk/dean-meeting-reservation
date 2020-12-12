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

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<DeanDepartment> deanDepartments = new ArrayList<>();

    public Department() {
    }

    public Department(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public List<DeanDepartment> getDeanDepartments() {
        return deanDepartments;
    }

    public void setDeanDepartments(List<DeanDepartment> deanDepartments) {
        this.deanDepartments = deanDepartments;
    }

    public void addDeanDepartment(DeanDepartment deanDepartment) {
        this.deanDepartments.add(deanDepartment);
    }

    public void addDean_department(DeanDepartment deanDepartment){this.deanDepartments.add(deanDepartment);}
}
