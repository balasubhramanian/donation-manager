package com.bala.donation.common.entity;

import java.time.format.DateTimeFormatter;

public final class RepoConstants {

    public static final String NQ_USER_PLEDGE_PAYMENT_STATUS_FOR_MONTHLY_CAMPAIGN = "USER_PLEDGE_PAYMENT_STATUS_FOR_MONTHLY_CAMPAIGN";
    public static final String NQ_USER_PLEDGE_PAYMENT_STATUS_FOR_ONCE_CAMPAIGN = "USER_PLEDGE_PAYMENT_STATUS_FOR_ONCE_CAMPAIGN";
    public static final String NQ_USER_PLEDGE_PAYMENT_STATUS_FOR_YEARLY_CAMPAIGN = "USER_PLEDGE_PAYMENT_STATUS_FOR_YEARLY_CAMPAIGN";

    public static final String NQ_ROLLUP_BALANCE = "ROLLUP_BALANCE";
    public static final String NQ_MONTLY_TRANSACTION_SUMMARY = "MONTLY_TRANSACTION_SUMMARY";
    public static final String NQ_DAILY_LEDGER_ENTRIES = "DAILY_LEDGER_ENTRIES";

    public static final DateTimeFormatter YEAR_MONTH_DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    public static final DateTimeFormatter YEAR_MONTH_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM");

}
