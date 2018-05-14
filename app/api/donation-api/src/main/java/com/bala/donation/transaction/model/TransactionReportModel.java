package com.bala.donation.transaction.model;

import java.math.BigDecimal;
import java.util.List;

public class TransactionReportModel {
    private BigDecimal openingBalance;
    private BigDecimal closingBalance;
    private List<LedgerEntryDTO> entries;

    public BigDecimal getOpeningBalance() {
        return openingBalance;
    }

    public void setOpeningBalance(BigDecimal openingBalance) {
        this.openingBalance = openingBalance;
    }

    public List<LedgerEntryDTO> getEntries() {
        return entries;
    }

    public void setEntries(List<LedgerEntryDTO> entries) {
        this.entries = entries;
    }

    public BigDecimal getClosingBalance() {
        return closingBalance;
    }

    public void setClosingBalance(BigDecimal closingBalance) {
        this.closingBalance = closingBalance;
    }
}
