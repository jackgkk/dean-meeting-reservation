package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.model.Dean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface DeanService {
    Dean loadUserByEmail(String email) throws UsernameNotFoundException;
}
