package com.iww.deanmeetingreservations.services;

import com.iww.deanmeetingreservations.DTO.RegistrationForm;
import com.iww.deanmeetingreservations.exceptions.ResourceAlreadyExistsError;
import com.iww.deanmeetingreservations.model.Dean;
import com.iww.deanmeetingreservations.model.DeanDepartment;
import com.iww.deanmeetingreservations.model.Department;
import com.iww.deanmeetingreservations.repository.DeanDepartmentRepository;
import com.iww.deanmeetingreservations.repository.DeanRepository;
import com.iww.deanmeetingreservations.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeanServiceImpl implements DeanService {

    @Autowired
    DeanRepository deanRepository;

    @Autowired
    DeanDepartmentRepository deanDepartmentRepository;

    @Autowired
    DepartmentRepository departmentRepository;

    //check if exists first
    /*@Override
    public Dean saveDean(Dean dean) {
        Dean newDean = deanRepository.save(dean);
        deanRepository.flush();
        return deanRepository.findById(newDean.getDean_id()).orElse(null);
    }*/

    //Slow, could lead to database discrepancies. Checks should be made on database side.
    //Multiple insertions should be made in one transaction?
    @Override
    public Dean saveDeanThroughForm(RegistrationForm form) throws ResourceAlreadyExistsError {
        if(deanRepository.existsByUsernameEquals(form.getUsername()))
            throw new ResourceAlreadyExistsError("User with " + form.getUsername() +" username already exists");
        if(deanRepository.existsByEmailEquals(form.getEmail()))
            throw new ResourceAlreadyExistsError("User with " + form.getEmail() + " email already exists");
        Dean newDean = new Dean(form.getUsername(), form.getPassword(), form.getName(), form.getSurname(),form.getEmail());
        Department department = departmentRepository.getFirstByDepartmentNameEquals(form.getDepartment()).orElse(null);
        if(department == null){
            department = new Department(form.getDepartment(),"");
            departmentRepository.save(department);
            departmentRepository.flush();
            department = departmentRepository.getFirstByDepartmentNameEquals(form.getDepartment()).get();
        }
        deanRepository.save(newDean);
        deanRepository.flush();
        newDean = deanRepository.getFirstByUsernameEquals(form.getUsername()).get();
        DeanDepartment deanDepartment = new DeanDepartment(newDean,department);
        newDean.addDean_department(deanDepartment);
        department.addDean_department(deanDepartment);
        deanDepartmentRepository.save(deanDepartment);
        departmentRepository.save(department);
        deanRepository.save(newDean);
        deanRepository.flush();
        newDean = deanRepository.getFirstByUsernameEquals(form.getUsername()).get();
        return newDean;
    }

    @Override
    public Boolean checkExistsByEmail(String email) {
        return deanRepository.existsByEmailEquals(email);
    }
}
