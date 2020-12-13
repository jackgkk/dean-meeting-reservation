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
    @Column(name = "DAY_OF_THE_WEEK", nullable = false)
    private String dayOfTheWeek;

    @Basic
    @Column(name = "STARTS_AT", nullable = false)
    private String startsAt;

    @Basic
    @Column(name = "ENDS_AT", nullable = false)
    private String endsAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dean_id")
    private Dean dean;

    public Duty() {
    }

    public Duty(String dayOfTheWeek, String startsAt, String endsAt) {
        this.dayOfTheWeek = dayOfTheWeek;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
    }

    public String getDayOfTheWeek() {
        return dayOfTheWeek;
    }

    public void setDayOfTheWeek(String dayOfTheWeek) {
        this.dayOfTheWeek = dayOfTheWeek;
    }

    public String getStartsAt() {
        return startsAt;
    }

    public void setStartsAt(String startsAt) {
        this.startsAt = startsAt;
    }

    public String getEndsAt() {
        return endsAt;
    }

    public void setEndsAt(String endsAt) {
        this.endsAt = endsAt;
    }

    public void setDean(Dean dean) {
        this.dean = dean;
    }

    public String getDeanEmail() {return this.dean.getEmail();}
}
