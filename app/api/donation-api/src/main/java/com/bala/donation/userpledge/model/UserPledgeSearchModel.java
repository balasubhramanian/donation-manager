package com.bala.donation.userpledge.model;

import java.util.Date;

public class UserPledgeSearchModel {
    Long userId;
    Long campaignId;
    Date fromDate;
    Date toDate;
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

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    public PledgePaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PledgePaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

}
