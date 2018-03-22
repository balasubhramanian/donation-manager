package com.bala.donation.rest.model;

public class FieldError extends ApiError {

    private String field;

    public FieldError(String field, String message) {
        this.field = field;
        setMessage(message);
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

}