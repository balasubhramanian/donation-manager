package com.bala.donation.transaction.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.bala.donation.account.entity.AccountEntity;
import com.bala.donation.account.repo.AccountRepo;
import com.bala.donation.common.exception.AppError;
import com.bala.donation.common.exception.AppException;
import com.bala.donation.common.exception.TransactionError;
import com.bala.donation.transaction.entity.TransactionEntity;
import com.bala.donation.transaction.mapper.TransactionMapper;
import com.bala.donation.transaction.model.LedgerEntryDTO;
import com.bala.donation.transaction.model.TransactionModel;
import com.bala.donation.transaction.model.TransactionReportModel;
import com.bala.donation.transaction.model.TransactionSearchModel;
import com.bala.donation.transaction.model.TransactionType;
import com.bala.donation.transaction.repo.TransactionRepo;
import com.bala.donation.user.entity.ConfigEntity;
import com.bala.donation.user.repo.ConfigRepo;;

@Component
public class TransactionService {

    @Autowired
    TransactionRepo transactionRepo;

    @Autowired
    AccountRepo accountRepo;

    @Autowired
    ConfigRepo configRepo;

    @Autowired
    TransactionMapper transactionMapper;

    public List<TransactionModel> getAllTransaction(TransactionSearchModel transactionSearchModel) {

        List<TransactionEntity> transactionEntities = transactionRepo
                .findAll(findTransactionBySpec(transactionSearchModel));

        List<TransactionModel> transactionModel = transactionMapper.toTransaction(transactionEntities);
        return transactionModel;
    }

    private Specification<TransactionEntity> findTransactionBySpec(TransactionSearchModel donationSearchModel) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (donationSearchModel.getId() != null && donationSearchModel.getId() > 0) {
                return cb.equal(root.get("id"), donationSearchModel.getId());
            }

            if (donationSearchModel.getTransactionType() != null) {
                predicates.add(cb.equal(root.get("transactionType"), donationSearchModel.getTransactionType()));
            }
            if (donationSearchModel.getTypeId() != null && donationSearchModel.getTypeId() > 0) {
                predicates.add(cb.equal(root.get("type").get("id"), donationSearchModel.getTypeId()));
            }

            if (donationSearchModel.getAccountId() != null && donationSearchModel.getAccountId() > 0) {
                predicates.add(cb.equal(root.get("account").get("id"), donationSearchModel.getAccountId()));
            }

            if (donationSearchModel.getFromDate() != null) {

                predicates.add(cb.greaterThanOrEqualTo(root.get("date"), donationSearchModel.getFromDate()));
            }

            if (donationSearchModel.getToDate() != null) {

                predicates.add(cb.lessThanOrEqualTo(root.get("date"), donationSearchModel.getToDate()));
            }

            if (donationSearchModel.getAmount() > 0) {
                if (donationSearchModel.getAmountComparator() == 1) {
                    predicates.add(cb.greaterThanOrEqualTo(root.get("amount"), donationSearchModel.getAmount()));
                } else if (donationSearchModel.getAmountComparator() == -1) {
                    predicates.add(cb.lessThanOrEqualTo(root.get("amount"), donationSearchModel.getAmount()));
                } else {
                    predicates.add(cb.equal(root.get("amount"), donationSearchModel.getAmount()));
                }
            }

            return cb.and(predicates.toArray(new Predicate[predicates.size()]));
        };

    }

    @Transactional
    public void saveTransaction(TransactionModel transactionModel) {
        ConfigEntity configEntity = configRepo.getOne(transactionModel.getTypeId());

        if (configEntity == null) {
            AppError errorType = TransactionType.CREDIT.equals(transactionModel.getTransactionType())
                    ? TransactionError.INCOME_TYPE_NOT_FOUND
                    : TransactionError.EXPENSE_TYPE_NOT_FOUND;

            throw new AppException(errorType);
        }

        AccountEntity accountEntity = null;
        if (transactionModel.getAccountId() != null) {
            accountEntity = accountRepo.getOne(transactionModel.getAccountId());
        }

        TransactionEntity transactionEntity = transactionMapper.toTransaction(transactionModel, configEntity,
                accountEntity);

        transactionRepo.save(transactionEntity);
    }

    public TransactionModel getTransaction(Long id) {
        TransactionEntity transactionEntity = transactionRepo.getOne(id);
        if (transactionEntity == null) {
            throw new AppException(TransactionError.TRANSACTION_NOT_FOUND);
        }
        TransactionModel transactionModel = transactionMapper.toTransaction(transactionEntity);
        return transactionModel;
    }

    @Transactional
    public void updateTransaction(Long id, TransactionModel transactionModel) {
        TransactionEntity transactionEntity = transactionRepo.getOne(id);

        if (transactionEntity == null) {
            throw new AppException(TransactionError.TRANSACTION_NOT_FOUND);
        }

        ConfigEntity configEntity = configRepo.getOne(transactionModel.getTypeId());

        if (configEntity == null) {
            AppError errorType = TransactionType.CREDIT.equals(transactionModel.getTransactionType())
                    ? TransactionError.INCOME_TYPE_NOT_FOUND
                    : TransactionError.EXPENSE_TYPE_NOT_FOUND;

            throw new AppException(errorType);
        }

        AccountEntity accountEntity = accountRepo.getOne(transactionModel.getAccountId());

        transactionEntity = transactionMapper.toTransaction(transactionModel, transactionEntity, configEntity,
                accountEntity);

        transactionRepo.save(transactionEntity);
    }

    public void deleteTransaction(Long id) {
        TransactionEntity transactionEntity = transactionRepo.getOne(id);
        if (transactionEntity == null) {
            throw new AppException(TransactionError.TRANSACTION_NOT_FOUND);
        }

        transactionRepo.delete(transactionEntity);
    }

    public TransactionReportModel findDailyLedgerEntries(LocalDate fromDate, LocalDate toDate) {
        List<LedgerEntryDTO> ledgerEntries = transactionRepo.findDailyLedgerTransaction(fromDate, toDate);
        BigDecimal openingBalance = transactionRepo.findOpeningBalanceOn(fromDate);

        return toTransactionReportModel(ledgerEntries, openingBalance);

    }

    private TransactionReportModel toTransactionReportModel(List<LedgerEntryDTO> ledgerEntries,
            BigDecimal openingBalance) {
        BigDecimal balance = openingBalance;

        for (LedgerEntryDTO ledger : ledgerEntries) {
            if (TransactionType.CREDIT.getCode() == ledger.getTransactionType().intValue()) {
                balance = balance.add(ledger.getAmount());
            } else {
                balance = balance.subtract(ledger.getAmount());
            }
            ledger.setRunningBalance(balance);
        }

        TransactionReportModel transactionReportModel = new TransactionReportModel();
        transactionReportModel.setOpeningBalance(openingBalance);
        transactionReportModel.setClosingBalance(balance);
        transactionReportModel.setEntries(ledgerEntries);
        return transactionReportModel;
    }

    public TransactionReportModel findMonthlyLedgerTransaction(LocalDate fromDate, LocalDate toDate) {
        List<LedgerEntryDTO> ledgerEntries = transactionRepo.findMonthlyLedgerTransaction(fromDate, toDate);
        BigDecimal openingBalance = transactionRepo.findOpeningBalanceOn(fromDate);

        return toTransactionReportModel(ledgerEntries, openingBalance);

    }

    // public TransactionReportModel findMonthlyLedgerTransaction(LocalDate
    // fromDate, LocalDate toDate) {
    // CompletableFuture<List<LedgerEntryDTO>> ledgerEntriesFuture =
    // CompletableFuture.supplyAsync(() -> {
    // return transactionRepo.findMonthlyLedgerTransaction(fromDate, toDate);
    // });
    //
    // CompletableFuture<Long> openingBalanceFuture =
    // CompletableFuture.supplyAsync(() -> {
    // return transactionRepo.findOpeningBalanceOn(fromDate);
    // });
    //
    // try {
    // TransactionReportModel transactionReportModel = new TransactionReportModel();
    // transactionReportModel.setOpeningBalance(openingBalanceFuture.get());
    // transactionReportModel.setEntries(ledgerEntriesFuture.get());
    // return transactionReportModel;
    // } catch (Exception e) {
    // e.printStackTrace();
    // throw new AppException(TransactionError.TRANSACTION_REPORT_ERROR);
    // }
    // }

}
