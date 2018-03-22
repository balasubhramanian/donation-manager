package com.bala.donation.common.exception.handler;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.bala.donation.rest.model.ValidationErrorDTO;

@ControllerAdvice
public class RestErrorHandler {

    private MessageSource messageSource;

    @Autowired
    public RestErrorHandler(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ValidationErrorDTO processValidationError(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        List<org.springframework.validation.FieldError> fieldErrors = result.getFieldErrors();

        ValidationErrorDTO dto = new ValidationErrorDTO();

        for (org.springframework.validation.FieldError fieldError : fieldErrors) {
            String localizedErrorMessage = resolveLocalizedErrorMessage(fieldError);
            dto.addFieldError(fieldError.getField(), localizedErrorMessage);
        }

        for (ObjectError objectError : result.getGlobalErrors()) {
            dto.addGlobalError(objectError.getCode(), objectError.getDefaultMessage());
        }

        return dto;
    }

    private String resolveLocalizedErrorMessage(org.springframework.validation.FieldError fieldError) {
        Locale currentLocale = LocaleContextHolder.getLocale();
        String localizedErrorMessage = messageSource.getMessage(fieldError, currentLocale);

        // If the message was not found, return the most accurate field error code
        // instead.
        // You can remove this check if you prefer to get the default error message.
        // if (localizedErrorMessage.equals(fieldError.getDefaultMessage())) {
        // String[] fieldErrorCodes = fieldError.getCodes();
        // localizedErrorMessage = fieldErrorCodes[0];
        // }
        System.out.println(localizedErrorMessage);
        return localizedErrorMessage;
    }
}