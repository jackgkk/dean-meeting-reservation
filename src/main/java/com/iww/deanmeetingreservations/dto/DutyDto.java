package com.iww.deanmeetingreservations.dto;

import com.iww.deanmeetingreservations.model.DutyDean;

import java.util.ArrayList;
import java.util.List;

public class DutyDto {

    private String duty_id;

    private String day_of_the_week;

    private String starts_at;

    private String ends_at;

    private List<DutyDean> duties_deans = new ArrayList<DutyDean>();
}
