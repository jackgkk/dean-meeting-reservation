package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.dto.RegistrationForm;
import com.iww.deanmeetingreservations.exceptions.ResourceAlreadyExistsError;
import com.iww.deanmeetingreservations.model.Dean;
import com.iww.deanmeetingreservations.model.DeanDepartment;
import com.iww.deanmeetingreservations.model.Department;
import org.springframework.transaction.annotation.Transactional;

public interface DeanService {

    Dean saveDeanThroughForm(RegistrationForm form) throws ResourceAlreadyExistsError;
    /*Dean saveDean(Dean dean);*/
    Boolean checkExistsByEmail(String email);
}
