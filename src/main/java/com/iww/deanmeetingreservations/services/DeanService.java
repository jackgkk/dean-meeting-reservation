package com.iww.deanmeetingreservations.services;

import com.iww.deanmeetingreservations.DTO.RegistrationForm;
import com.iww.deanmeetingreservations.exceptions.ResourceAlreadyExistsError;
import com.iww.deanmeetingreservations.model.Dean;

public interface DeanService {

    Dean saveDeanThroughForm(RegistrationForm form) throws ResourceAlreadyExistsError;
    /*Dean saveDean(Dean dean);*/
    Boolean checkExistsByEmail(String email);
}
