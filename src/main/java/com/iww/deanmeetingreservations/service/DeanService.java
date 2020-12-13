package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.dto.DeanLoginDto;
import com.iww.deanmeetingreservations.dto.RegistrationForm;
import com.iww.deanmeetingreservations.dto.TokenDto;
import com.iww.deanmeetingreservations.exceptions.ResourceAlreadyExistsError;
import com.iww.deanmeetingreservations.model.Dean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface DeanService extends UserDetailsService {
    Dean loadUserByEmail(String email) throws UsernameNotFoundException;

    Boolean isLogged(String token) throws Exception;

    TokenDto loginDean(DeanLoginDto deanLoginDto);

    Dean saveDeanThroughForm(RegistrationForm form) throws ResourceAlreadyExistsError;

    Boolean checkExistsByEmail(String email);
}
