package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.model.Dean;
import com.iww.deanmeetingreservations.repository.DeanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DeanServiceImpl implements DeanService {

    @Autowired
    private DeanRepository deanRepository;

    @Override
    public Dean loadUserByEmail(String email) throws UsernameNotFoundException {
        Dean dean = deanRepository.findByEmail(email);
        if (dean == null) {
            throw new UsernameNotFoundException("Email not found");
        }
        return dean;
    }
}
