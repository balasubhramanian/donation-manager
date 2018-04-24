package com.bala.donation.account.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bala.donation.account.entity.AccountEntity;

public interface AccountRepo extends JpaRepository<AccountEntity, Long> {

}
