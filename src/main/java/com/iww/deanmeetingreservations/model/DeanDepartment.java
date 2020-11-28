package com.iww.deanmeetingreservations.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "DEANS_DEPARTMENTS")
public class DeanDepartment {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "DEAN_DEPARTMENT_ID")
    private String deanDepartmentId;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "dean_id")
    private Dean dean;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    public DeanDepartment() {
    }

    public DeanDepartment(String dean_department_id, Dean dean, Department department) {
        this.deanDepartmentId = dean_department_id;
        this.dean = dean;
        this.department = department;
    }

    public DeanDepartment(Dean dean, Department department) {
        this.dean = dean;
        this.department = department;
    }

    public String getDeanDepartmentId() {
        return deanDepartmentId;
    }

    public void setDeanDepartmentId(String dean_department_id) {
        this.deanDepartmentId = dean_department_id;
    }

    public Dean getDean() {
        return dean;
    }

    public void setDean(Dean dean) {
        this.dean = dean;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getDepartmentName(){return this.department.getDepartmentName();}
}
