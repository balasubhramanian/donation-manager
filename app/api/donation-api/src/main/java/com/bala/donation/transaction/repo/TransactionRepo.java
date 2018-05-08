package com.bala.donation.transaction.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bala.donation.transaction.entity.TransactionEntity;

public interface TransactionRepo extends JpaRepository<TransactionEntity, Long>,
        JpaSpecificationExecutor<TransactionEntity>, TransactionCustomRepo {

}
