package com.bala.donation.account.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Component;

import com.bala.donation.account.entity.AccountEntity;
import com.bala.donation.account.model.AccountModel;

@Component
public class AccountMapper {

    public List<AccountModel> toAccount(List<AccountEntity> accountEntities) {
        if (CollectionUtils.isEmpty(accountEntities)) {
            return new ArrayList<>();
        }

        List<AccountModel> accounts = accountEntities.stream().map(this::toAccount).collect(Collectors.toList());
        return accounts;
    }

    public AccountModel toAccount(AccountEntity entity) {
        AccountModel model = new AccountModel();
        model.setAccountNo(entity.getAccountNo());
        model.setBalance(entity.getBalance());
        model.setDescription(entity.getDescription());
        model.setId(entity.getId());
        model.setName(entity.getName());
        model.setStatus(entity.getStatus() + "");
        return model;
    }

    public AccountEntity toAccount(AccountModel model, AccountEntity entity) {
        entity.setAccountNo(model.getAccountNo());
        // entity.setBalance(model.getBalance());
        entity.setDescription(model.getDescription());
        entity.setName(model.getName());
        return entity;

    }

    public AccountEntity toAccount(AccountModel model) {
        AccountEntity entity = new AccountEntity();
        return toAccount(model, entity);
    }

}
