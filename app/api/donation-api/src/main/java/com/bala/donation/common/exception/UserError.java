package com.bala.donation.common.exception;

public enum UserError implements AppError {
    ROLE_NOT_FOUND("role.notdefined", "Role Not Found", SeverityType.NONE, ErrorType.VALIDATION_FAILURE),
    PERMISSION_NOT_FOUND("permission.notfound", "Permission Not Found", SeverityType.NONE,
            ErrorType.VALIDATION_FAILURE),
    PERMISSION_NOT_AVAILABLE_FOR_ROLE("permission.notavailable", "Permission Not available for Role", SeverityType.NONE,
            ErrorType.VALIDATION_FAILURE),

    USER_NOT_FOUND("user.notfound", "User Not Found", SeverityType.NONE, ErrorType.VALIDATION_FAILURE),
    ROLE_NOT_AVAILABLE_FOR_USER("role.notavailable", "Role Not available for User", SeverityType.NONE,
            ErrorType.VALIDATION_FAILURE)

    ;

    String errorCode;
    String defaultMessage;
    SeverityType severityType;
    ErrorType errorType;

    UserError(String errorCode, String defaultMessage, SeverityType severityType, ErrorType errorType) {
        this.errorCode = errorCode;
        this.defaultMessage = defaultMessage;
        this.severityType = severityType;
        this.errorType = errorType;
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
