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
    @Column(name = "DEAN_DEPARTMENT_ID")
    private UUID dean_department_id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "dean_id")
    private Dean dean;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    public DeanDepartment() {
    }

    public DeanDepartment(UUID dean_department_id, Dean dean, Department department) {
        this.dean_department_id = dean_department_id;
        this.dean = dean;
        this.department = department;
    }

    public UUID getDean_department_id() {
        return dean_department_id;
    }

    public void setDean_department_id(UUID dean_department_id) {
        this.dean_department_id = dean_department_id;
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
}
