package com.bala.donation.userpledge.model;

import java.time.LocalDate;

public class UserPledgeSearchModel {
    Long userId;
    Long campaignId;
    LocalDate fromDate;
    LocalDate toDate;
    PledgePaymentStatus paymentStatus = PledgePaymentStatus.ALL;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Long campaignId) {
        this.campaignId = campaignId;
    }

    public LocalDate getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDate getToDate() {
        return toDate;
    }

    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }

    public PledgePaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PledgePaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

}
