package com.iww.deanmeetingreservations.Models;

import javax.persistence.*;

@Entity
@Table(name = "DEANS_DEPARTMENTS", schema = "TEST")
public class Dean_department {

    @Id
    @Column(name = "DEAN_DEPARTMENT_ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long dean_department_id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "dean_id")
    private Dean dean;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    public Dean_department() {
    }

    public Dean_department(Long dean_department_id, Dean dean, Department department) {
        this.dean_department_id = dean_department_id;
        this.dean = dean;
        this.department = department;
    }

    public Long getDean_department_id() {
        return dean_department_id;
    }

    public void setDean_department_id(Long dean_department_id) {
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
