package com.bala.donation.account.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bala.donation.account.entity.AccountEntity;
import com.bala.donation.account.mapper.AccountMapper;
import com.bala.donation.account.model.AccountModel;
import com.bala.donation.account.repo.AccountRepo;
import com.bala.donation.common.exception.AccountError;
import com.bala.donation.common.exception.AppException;
import com.bala.donation.user.repo.ConfigRepo;;

@Component
public class AccountService {

    @Autowired
    AccountRepo accountRepo;
    @Autowired
    ConfigRepo configRepo;
    @Autowired
    AccountMapper accountMapper;

    public List<AccountModel> getAll() {
        List<AccountEntity> accountEntities = accountRepo.findAll();
        List<AccountModel> accountModels = accountMapper.toAccount(accountEntities);
        return accountModels;
    }

    @Transactional
    public void save(AccountModel account) {

        AccountEntity accountEntity = accountMapper.toAccount(account);
        accountRepo.save(accountEntity);
    }

    public AccountModel get(Long id) {
        AccountEntity accountEntity = accountRepo.findOne(id);
        if (accountEntity == null) {
            throw new AppException(AccountError.ACCOUNT_NOT_FOUNT);
        }
        AccountModel accountModel = accountMapper.toAccount(accountEntity);
        return accountModel;
    }

    @Transactional
    public void update(Long id, AccountModel campaign) {
        AccountEntity accountEntity = accountRepo.findOne(id);
        if (accountEntity == null) {
            throw new AppException(AccountError.ACCOUNT_NOT_FOUNT);
        }
        accountEntity = accountMapper.toAccount(campaign, accountEntity);
        accountRepo.save(accountEntity);
    }

    public void delete(Long id) {
        AccountEntity accountEntity = accountRepo.findOne(id);
        if (accountEntity == null) {
            throw new AppException(AccountError.ACCOUNT_NOT_FOUNT);
        }
        accountRepo.delete(accountEntity);
    }

}
