package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.dto.DeanDto;

public interface DeanInfoService {
    DeanDto updateProfile(DeanDto deanDto, String id);

    DeanDto changePassword(DeanDto deanDto, String newPassword);

    DeanDto findUserById(String id);
}
