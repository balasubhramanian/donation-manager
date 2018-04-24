package com.bala.donation.common.exception;

public enum DonationError implements AppError {

    DONATION_NOT_FOUND("donation.notfound", "Donation Not Found", SeverityType.NONE, ErrorType.VALIDATION_FAILURE),
    DONOR_NOT_FOUND("donor.notfound", "Donor Not Found", SeverityType.NONE, ErrorType.VALIDATION_FAILURE),

    CAMPAIGN_TYPE_NOT_FOUND("campaign.type.notfound", "Campaign Type Not Found", SeverityType.NONE,
            ErrorType.VALIDATION_FAILURE),

    CAMPAIGN_NOT_FOUND("campaign.notfound", "Campaign Not Found", SeverityType.NONE, ErrorType.VALIDATION_FAILURE),

    USER_PLEDGE_NOT_FOUND("user.pledge.notfound", "User Pledge Not Found", SeverityType.NONE,
            ErrorType.VALIDATION_FAILURE),;

    String errorCode;
    String defaultMessage;
    SeverityType severityType;
    ErrorType errorType;

    DonationError(String errorCode, String defaultMessage, SeverityType severityType, ErrorType errorType) {
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
