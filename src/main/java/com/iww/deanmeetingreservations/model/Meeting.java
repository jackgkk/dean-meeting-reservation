package com.iww.deanmeetingreservations.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "meeting")
public class Meeting {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id")
    private String id;

    // TODO: Dean FK

    @Column(name = "guest_name")
    private String guestName;

    @Column(name = "guest_surname")
    private String guestSurname;

    @Column(name = "guest_email")
    private String email;

    @Column(name = "description")
    private String description;

    @Column(name = "begins_at")
    private Date beginsAt;

    @Column(name = "duration")
    private int duration;

    @Column(name = "is_online")
    private boolean isOnline;



    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}
