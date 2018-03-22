package com.bala.donation.common.exception;

public interface AppError {

    String getErrorCode();

    String getDefaultMessage();

    SeverityType getSeverity();

    ErrorType getType();
}
