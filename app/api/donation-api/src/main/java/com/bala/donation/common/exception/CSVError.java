package com.bala.donation.common.exception;

public enum CSVError implements AppError {

    INVALID_DATA("csv.invalid", "invalid data", SeverityType.NONE, ErrorType.VALIDATION_FAILURE),;

    String errorCode;
    String defaultMessage;
    SeverityType severityType;
    ErrorType errorType;

    CSVError(String errorCode, String defaultMessage, SeverityType severityType, ErrorType errorType) {
        this.errorCode = errorCode;
        this.defaultMessage = defaultMessage;
        this.severityType = severityType;
        this.errorType = errorType;
    }

    public CSVError withMessage(String msg) {
        this.defaultMessage = msg;
        return this;
    }

    @Override
    public String getErrorCode() {
        return errorCode;
    }

    @Override
    public String getDefaultMessage() {
        return defaultMessage;
    }

    @Override
    public SeverityType getSeverity() {
        return severityType;
    }

    @Override
    public ErrorType getType() {
        return errorType;
    }

}
