package com.bala.donation.transaction.repo;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.bala.donation.transaction.model.LedgerEntryDTO;

public interface TransactionCustomRepo {

    List<LedgerEntryDTO> findDailyLedgerTransaction(LocalDate fromDate, LocalDate toDate);

    List<LedgerEntryDTO> findMonthlyLedgerTransaction(LocalDate fromDate, LocalDate toDate);

    BigDecimal findOpeningBalanceOn(LocalDate date);

}
