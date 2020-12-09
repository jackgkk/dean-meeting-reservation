package com.iww.deanmeetingreservations.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ROLES")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ROLE_ID")
    private Long roleId;

    @Basic
    @Column(name = "ROLE_NAME", unique = true, nullable = false)
    private String name;

    @ManyToMany(mappedBy = "roles")
    private final List<Dean> deanList = new ArrayList<>();

    public Role(String role_user) {
    }

    public Role() {
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}