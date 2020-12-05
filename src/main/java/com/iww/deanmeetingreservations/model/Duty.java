package com.iww.deanmeetingreservations.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dean_id")
    private Dean dean;

    public Duty() {
    }
}
