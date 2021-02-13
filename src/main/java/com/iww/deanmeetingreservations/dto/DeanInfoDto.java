package com.iww.deanmeetingreservations.dto;

import java.util.ArrayList;
import java.util.List;

public class DeanInfoDto {

    private String name;

    private String surname;

    private String email;

    private List<DutyDto> duties = new ArrayList<DutyDto>();

    private final String status = "Dean";

    public DeanInfoDto(String name, String surname, String email, List<DutyDto> duties) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.duties = duties;
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

    public List<DutyDto> getDuties() {
        return duties;
    }

    public void setDuties(List<DutyDto> duties) {
        this.duties = duties;
    }

    public String getStatus() {
        return status;
    }

    public static class DutyDto {
        private String dayOfWeek;
        private String begins;
        private String ends;

        public DutyDto(String dayOfWeek, String begins, String ends) {
            this.dayOfWeek = dayOfWeek;
            this.begins = begins;
            this.ends = ends;
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
}
