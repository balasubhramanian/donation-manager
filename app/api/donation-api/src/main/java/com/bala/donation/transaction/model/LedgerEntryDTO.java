package com.bala.donation.transaction.model;

import java.math.BigInteger;

public class LedgerEntryDTO {
    private String date;
    private BigInteger collectionTypeId;
    private String collectionType;
    private String type;
    private BigInteger transactionType;
    private Double amount;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public BigInteger getCollectionTypeId() {
        return collectionTypeId;
    }

    public void setCollectionTypeId(BigInteger collectionTypeId) {
        this.collectionTypeId = collectionTypeId;
    }

    public String getCollectionType() {
        return collectionType;
    }

    public void setCollectionType(String collectionType) {
        this.collectionType = collectionType;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setTransactionType(BigInteger transactionType) {
        this.transactionType = transactionType;
    }

    public BigInteger getTransactionType() {
        return transactionType;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

}
