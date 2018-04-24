package com.bala.donation.transaction.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Component;

import com.bala.donation.account.entity.AccountEntity;
import com.bala.donation.transaction.entity.TransactionEntity;
import com.bala.donation.transaction.model.TransactionModel;
import com.bala.donation.user.entity.ConfigEntity;

@Component
public class TransactionMapper {

    public List<TransactionModel> toTransaction(List<TransactionEntity> transactionEntities) {
        if (CollectionUtils.isEmpty(transactionEntities)) {
            return new ArrayList<>();
        }

        List<TransactionModel> transactions = transactionEntities.stream().map(this::toTransaction)
                .collect(Collectors.toList());
        return transactions;
    }

    public TransactionModel toTransaction(TransactionEntity entity) {
        TransactionModel model = new TransactionModel();

        if (entity.getAccount() != null) {
            model.setAccountId(entity.getAccount().getId());
            model.setAccountName(entity.getAccount().getName());
        }
        model.setAmount(entity.getAmount());
        model.setId(entity.getId());
        model.setDate(entity.getDate());

        model.setTransactionType(entity.getTransactionType());
        model.setTypeId(entity.getType().getId());
        model.setTypeName(entity.getType().getName());
        model.setTypeDesc(entity.getType().getDescription());
        return model;
    }

    public TransactionEntity toTransaction(TransactionModel model, TransactionEntity transactionEntity,
            ConfigEntity configEntity, AccountEntity accountEntity) {

        transactionEntity.setAccount(accountEntity);
        transactionEntity.setAmount(model.getAmount());
        transactionEntity.setType(configEntity);
        transactionEntity.setDate(model.getDate());
        transactionEntity.setTransactionType(model.getTransactionType());
        return transactionEntity;

    }

    public TransactionEntity toTransaction(TransactionModel model, ConfigEntity configEntity,
            AccountEntity accountEntity) {
        TransactionEntity entity = new TransactionEntity();
        return toTransaction(model, entity, configEntity, accountEntity);
    }

}
