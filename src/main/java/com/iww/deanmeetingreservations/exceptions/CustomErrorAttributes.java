package com.iww.deanmeetingreservations.exceptions;

import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

@Component
public class CustomErrorAttributes extends DefaultErrorAttributes {

    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
        Throwable throwable = getError(webRequest);
        Map<String, Object> errorAttributes =
                super.getErrorAttributes(webRequest, options);
        errorAttributes.replace("message",throwable.getMessage());
        errorAttributes.put("exception",throwable.getClass().getName());
        return errorAttributes;
    }


}