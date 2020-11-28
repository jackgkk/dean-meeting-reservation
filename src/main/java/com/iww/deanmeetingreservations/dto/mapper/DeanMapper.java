package com.iww.deanmeetingreservations.dto.mapper;

import com.iww.deanmeetingreservations.dto.DeanDto;
import com.iww.deanmeetingreservations.model.Dean;
import org.springframework.stereotype.Component;

@Component
public class DeanMapper {

    public static DeanDto toDeanDto(Dean dean) {
        return new DeanDto(dean.getFirstname(), dean.getLastname(), dean.getEmail());
    }
}
