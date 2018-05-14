package com.bala.donation.transaction.model;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class TransactionTypeConvertor implements AttributeConverter<TransactionType, Integer> {

    @Override
    public Integer convertToDatabaseColumn(TransactionType value) {
        if (value == null) {
            return null;
        }

        return value.getCode();
    }

    @Override
    public TransactionType convertToEntityAttribute(Integer value) {
        if (value == null) {
            return null;
        }

        return TransactionType.fromCode(value);
    }
}