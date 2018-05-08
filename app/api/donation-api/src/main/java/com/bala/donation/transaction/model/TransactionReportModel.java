package com.bala.donation.transaction.model;

import java.util.List;

public class TransactionReportModel {
    private Double openingBalance;
    private List<LedgerEntryDTO> entries;

    public Double getOpeningBalance() {
        return openingBalance;
    }

    public void setOpeningBalance(Double openingBalance) {
        this.openingBalance = openingBalance;
    }

    public List<LedgerEntryDTO> getEntries() {
        return entries;
    }

    public void setEntries(List<LedgerEntryDTO> entries) {
        this.entries = entries;
    }
}
