package com.iww.deanmeetingreservations.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "DUTIES")
public class Duty {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "DUTY_ID")
    private String dutyId;

    @Basic
    @Column(name = "DAY_OF_THE_WEEK")
    private String dayOfTheWeek;

    @Basic
    @Column(name = "STARTS_AT")
    private String startsAt;

    @Basic
    @Column(name = "ENDS_AT")
    private String endsAt;

    @OneToMany(mappedBy = "dean", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<DutyDean> dutiesDeans = new ArrayList<DutyDean>();

    public Duty() {
    }
}
