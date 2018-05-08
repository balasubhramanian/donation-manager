package com.bala.donation.common.exception;

public enum TransactionError implements AppError {

    EXPENSE_TYPE_NOT_FOUND("transaction.expense.notfound", "Expense type Not Found", SeverityType.NONE,
            ErrorType.VALIDATION_FAILURE),

    INCOME_TYPE_NOT_FOUND("transaction.income.notfound", "Income type Not Found", SeverityType.NONE,
            ErrorType.VALIDATION_FAILURE),

    TRANSACTION_TYPE_NOT_FOUND("transaction.type.notfound", "Transaction type Not Found", SeverityType.NONE,
            ErrorType.VALIDATION_FAILURE),

    TRANSACTION_NOT_FOUND("transaction.notfound", "Transaction Not Found", SeverityType.NONE,
            ErrorType.VALIDATION_FAILURE),

    TRANSACTION_REPORT_ERROR("transaction.report.error", "Transaction Report Error", SeverityType.FATAL,
            ErrorType.ERROR)

    ;

    String errorCode;
    String defaultMessage;
    SeverityType severityType;
    ErrorType errorType;

    TransactionError(String errorCode, String defaultMessage, SeverityType severityType, ErrorType errorType) {
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
