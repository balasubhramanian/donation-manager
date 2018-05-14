package com.bala.donation.donation.dto;

import java.math.BigDecimal;
import java.math.BigInteger;

public class UserDonationDTO {
    private String period;
    private BigInteger userId;
    private String firstname;
    private String phone;
    private String lastname;
    private BigInteger campaignId;
    private String campaignName;
    private BigInteger pledgedAmount;
    private BigDecimal paidAmount;
    private BigInteger difference;

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public BigInteger getUserId() {
        return userId;
    }

    public void setUserId(BigInteger userId) {
        this.userId = userId;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public BigInteger getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(BigInteger campaignId) {
        this.campaignId = campaignId;
    }

    public String getCampaignName() {
        return campaignName;
    }

    public void setCampaignName(String campaignName) {
        this.campaignName = campaignName;
    }

    public BigInteger getPledgedAmount() {
        return pledgedAmount;
    }

    public void setPledgedAmount(BigInteger pledgedAmount) {
        this.pledgedAmount = pledgedAmount;
    }

    public BigDecimal getPaidAmount() {
        return paidAmount;
    }

    public void setPaidAmount(BigDecimal paidAmount) {
        this.paidAmount = paidAmount;
    }

    public BigInteger getDifference() {
        return difference;
    }

    public void setDifference(BigInteger difference) {
        this.difference = difference;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}
