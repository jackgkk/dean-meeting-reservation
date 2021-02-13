package com.iww.deanmeetingreservations.dto;

import com.iww.deanmeetingreservations.model.Duty;

import java.util.List;
import java.util.stream.Collectors;

public class DepartmentDeanDutiesDto {
    String id;
    String name;
    String surname;
    String email;

    List<OfficeHour> duties;

    public DepartmentDeanDutiesDto(String id, String name, String surname, String email, List<Duty> duties) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;

        this.duties = duties
                .stream()
                .map(duty ->
                        new OfficeHour(
                                duty.getDayOfTheWeek(),
                                duty.getStartsAt(),
                                duty.getEndsAt()
                        )).collect(Collectors.toList());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<OfficeHour> getDuties() {
        return duties;
    }

    public void setDuties(List<OfficeHour> duties) {
        this.duties = duties;
    }
}

class OfficeHour {
    String dayOfWeek;
    String begins;
    String ends;
//    String status;

    public OfficeHour(String dayOfWeek, String begins, String ends/*, String status*/) {
        this.dayOfWeek = dayOfWeek;
        this.begins = begins;
        this.ends = ends;
        /*this.status = status;*/
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getBegins() {
        return begins;
    }

    public void setBegins(String begins) {
        this.begins = begins;
    }

    public String getEnds() {
        return ends;
    }

    public void setEnds(String ends) {
        this.ends = ends;
    }
}