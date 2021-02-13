package com.iww.deanmeetingreservations.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "DEANS_DEPARTMENTS")
public class DeanDepartment {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "DEAN_DEPARTMENT_ID", columnDefinition = "BINARY(16)")
    private UUID deanDepartmentId;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "dean_id")
    private Dean dean;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    public DeanDepartment() {
    }

    public DeanDepartment(Dean dean, Department department) {
        this.dean = dean;
        this.department = department;
    }

    public UUID getDeanDepartmentId() {
        return deanDepartmentId;
    }

    public void setDeanDepartmentId(UUID deanDepartmentId) {
        this.deanDepartmentId = deanDepartmentId;
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
