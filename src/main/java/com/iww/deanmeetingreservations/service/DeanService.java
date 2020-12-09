package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.dto.DeanLoginDto;
import com.iww.deanmeetingreservations.dto.TokenDto;
import com.iww.deanmeetingreservations.model.Dean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface DeanService extends UserDetailsService {
    Dean loadUserByEmail(String email) throws UsernameNotFoundException;

    Boolean isLogged(String token);

    TokenDto loginDean(DeanLoginDto deanLoginDto);
}
