package com.bala.donation.transaction.model;

public enum TransactionType {
    CREDIT(1), DEBIT(-1);

    int code;

    TransactionType(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static TransactionType fromCode(int code) {
        for (TransactionType status : TransactionType.values()) {
            if (status.getCode() == code) {
                return status;
            }
        }
        throw new UnsupportedOperationException("The code " + code + " is not supported!");
    }
}
