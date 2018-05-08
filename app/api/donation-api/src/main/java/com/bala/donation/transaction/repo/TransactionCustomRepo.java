package com.bala.donation.transaction.repo;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.Future;

import com.bala.donation.transaction.model.LedgerEntryDTO;

public interface TransactionCustomRepo {

    List<LedgerEntryDTO> findDailyLedgerTransaction(LocalDate fromDate, LocalDate toDate);

    List<LedgerEntryDTO> findMonthlyLedgerTransaction(LocalDate fromDate, LocalDate toDate);

    Double findOpeningBalanceOn(LocalDate date);

    Future<List<LedgerEntryDTO>> findDailyLedgerTransactionAsync(LocalDate fromDate, LocalDate toDate);

}
