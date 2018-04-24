package com.bala.donation.donation.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Component;

import com.bala.donation.account.entity.AccountEntity;
import com.bala.donation.campaign.entity.CampaignEntity;
import com.bala.donation.donation.entity.DonationEntity;
import com.bala.donation.donation.model.DonationModel;
import com.bala.donation.user.entity.UserDetailsEntity;

@Component
public class DonationMapper {

    public List<DonationModel> toDonation(List<DonationEntity> donationEntities) {
        if (CollectionUtils.isEmpty(donationEntities)) {
            return new ArrayList<>();
        }

        List<DonationModel> donations = donationEntities.stream().map(this::toDonation).collect(Collectors.toList());
        return donations;
    }

    public DonationModel toDonation(DonationEntity entity) {
        DonationModel model = new DonationModel();
        if (entity.getAccount() != null) {
            model.setAccountId(entity.getAccount().getId());
            model.setAccountName(entity.getAccount().getName());
        }
        model.setAmount(entity.getAmount());
        model.setCampaignId(entity.getCampaign().getId());
        model.setCampaignName(entity.getCampaign().getName());

        model.setDonorId(entity.getUserDetails().getId());
        model.setDonorName(entity.getUserDetails().getFirstname());

        model.setId(entity.getId());
        model.setDate(entity.getDate());
        return model;
    }

    public DonationEntity toDonation(DonationModel model, DonationEntity donationEntity, CampaignEntity campaignEntity,
            UserDetailsEntity userDetailsEntity, AccountEntity accountEntity) {

        donationEntity.setAccount(accountEntity);
        donationEntity.setAmount(model.getAmount());
        donationEntity.setCampaign(campaignEntity);
        donationEntity.setDate(model.getDate());
        donationEntity.setUserDetails(userDetailsEntity);

        return donationEntity;

    }

    public DonationEntity toDonation(DonationModel model, CampaignEntity campaignEntity,
            UserDetailsEntity userDetailsEntity, AccountEntity accountEntity) {
        DonationEntity entity = new DonationEntity();
        return toDonation(model, entity, campaignEntity, userDetailsEntity, accountEntity);
    }

}
