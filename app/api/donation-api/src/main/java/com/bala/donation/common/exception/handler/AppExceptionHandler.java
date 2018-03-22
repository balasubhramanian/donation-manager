package com.bala.donation.common.exception.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.bala.donation.common.exception.AppException;
import com.bala.donation.rest.model.ValidationErrorDTO;

@ControllerAdvice
public class AppExceptionHandler {

    private MessageSource messageSource;

    @Autowired
    public AppExceptionHandler(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @ExceptionHandler(AppException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ValidationErrorDTO processValidationError(AppException ex) {
        ValidationErrorDTO dto = new ValidationErrorDTO();
        dto.addGlobalError(ex.getError().getErrorCode(), ex.getError().getDefaultMessage());
        return dto;
    }

}