package com.bala.donation.rest.model;

public class ApiError {
    private String code;

    private String message;

    public ApiError() {

    }

    public ApiError(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

}
