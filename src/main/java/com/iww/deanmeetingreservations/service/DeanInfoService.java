package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.dto.DeanDto;
import com.iww.deanmeetingreservations.dto.DeanInfoDto;

public interface DeanInfoService {
    void updateProfile(DeanDto deanDto, String id);

    DeanInfoDto findUserById(String id);
}
