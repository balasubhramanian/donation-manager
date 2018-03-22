package com.bala.donation.common.exception;

public class AppException extends RuntimeException {
    AppError error;
    String message;

    public AppException(AppError appError) {
        this.error = appError;
    }

    public AppException(AppError appError, String message) {
        this.error = appError;
        this.message = message;
    }

    public AppError getError() {
        return error;
    }

    public void setError(AppError error) {
        this.error = error;
    }

}
