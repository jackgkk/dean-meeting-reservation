package com.iww.deanmeetingreservations.dto;

public class DutyDto {
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
