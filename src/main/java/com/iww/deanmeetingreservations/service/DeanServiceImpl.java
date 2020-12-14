package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.config.JwtTokenUtil;
import com.iww.deanmeetingreservations.dto.DeanLoginDto;
import com.iww.deanmeetingreservations.dto.RegistrationForm;
import com.iww.deanmeetingreservations.dto.TokenDto;
import com.iww.deanmeetingreservations.exceptions.ResourceAlreadyExistsError;
import com.iww.deanmeetingreservations.model.Dean;
import com.iww.deanmeetingreservations.model.DeanDepartment;
import com.iww.deanmeetingreservations.model.Department;
import com.iww.deanmeetingreservations.repository.DeanDepartmentRepository;
import com.iww.deanmeetingreservations.repository.DeanRepository;
import com.iww.deanmeetingreservations.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DeanServiceImpl implements DeanService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private DeanRepository deanRepository;

    @Autowired
    DeanDepartmentRepository deanDepartmentRepository;

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    BCryptPasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String email) {
        Dean dean = deanRepository.findByEmail(email);
        if (dean == null) {
            throw new UsernameNotFoundException("Invalid email or password.");
        }
        return new org.springframework.security.core.userdetails.User(dean.getEmail(),
                dean.getPassword(),
                dean.getRole());
    }

    @Override
    public Dean loadUserByEmail(String email) throws UsernameNotFoundException {
        Dean dean = deanRepository.findByEmail(email);
        if (dean == null) {
            throw new UsernameNotFoundException("Email not found");
        }
        return dean;
    }

    @Override
    public Boolean isLogged(String token) {
        String email = jwtTokenUtil.getEmailFromToken(token);
        return jwtTokenUtil.validateToken(token, this.loadUserByUsername(email));
    }

    @Override
    public TokenDto loginDean(DeanLoginDto deanLoginDto) {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        deanLoginDto.getEmail(),
                        deanLoginDto.getPassword()
                )
        );
        System.out.println("test");
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final Dean dean = this.loadUserByEmail(deanLoginDto.getEmail());
        final String token = jwtTokenUtil.generateToken(dean);
        return new TokenDto(token, dean.getEmail());
    }

    @Override
    public Dean saveDeanThroughForm(RegistrationForm form) throws ResourceAlreadyExistsError {
        if(deanRepository.existsByEmailEquals(form.getEmail()))
            throw new ResourceAlreadyExistsError("User with " + form.getEmail() + " email already exists");
        Dean newDean = new Dean(encoder.encode(form.getPassword()), form.getName(), form.getSurname(),form.getEmail());
        Department department = departmentRepository.getFirstByDepartmentNameEquals(form.getDepartment()).orElse(null);
        if(department == null){
            department = new Department(form.getDepartment());
            department = departmentRepository.save(department);
        }
        deanRepository.save(newDean);
        DeanDepartment deanDepartment = new DeanDepartment(newDean, department);
        newDean.addDeanDepartment(deanDepartment);
        department.addDeanDepartment(deanDepartment);
        deanDepartmentRepository.save(deanDepartment);
        departmentRepository.save(department);
        newDean = deanRepository.save(newDean);
        return newDean;
    }

    @Override
    public Boolean checkExistsByEmail(String email) {
        return deanRepository.existsByEmailEquals(email);
    }
}
