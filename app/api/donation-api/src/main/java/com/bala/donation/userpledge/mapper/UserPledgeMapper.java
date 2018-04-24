package com.bala.donation.userpledge.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.bala.donation.campaign.entity.CampaignEntity;
import com.bala.donation.user.entity.UserDetailsEntity;
import com.bala.donation.userpledge.entity.UserPledgeEntity;
import com.bala.donation.userpledge.model.UserPledgeModel;

@Component
public class UserPledgeMapper {

    public List<UserPledgeModel> toUserPledge(List<UserPledgeEntity> userPledgeEntities) {
        if (userPledgeEntities == null) {
            return new ArrayList<>();
        }

        List<UserPledgeModel> userPledges = userPledgeEntities.stream().map(this::toUserPledge)
                .collect(Collectors.toList());
        return userPledges;
    }

    public UserPledgeModel toUserPledge(UserPledgeEntity userPledgeEntity) {
        UserPledgeModel userPledgeModel = new UserPledgeModel();
        userPledgeModel.setId(userPledgeEntity.getId());
        userPledgeModel.setDonorId(userPledgeEntity.getUserDetails().getId());
        userPledgeModel.setDonorName(userPledgeEntity.getUserDetails().getFirstname());
        userPledgeModel.setCampaignId(userPledgeEntity.getCampaign().getId());
        userPledgeModel.setCampaignName(userPledgeEntity.getCampaign().getName());
        userPledgeModel.setAmount(userPledgeEntity.getAmount());
        return userPledgeModel;
    }

    public UserPledgeEntity toUserPledge(UserPledgeModel userPledgeModel, UserPledgeEntity userPledgeEntity,
            UserDetailsEntity userDetailsEntity, CampaignEntity campaignEntity) {
        userPledgeEntity.setUserDetails(userDetailsEntity);
        userPledgeEntity.setCampaign(campaignEntity);
        userPledgeEntity.setAmount(userPledgeModel.getAmount());
        return userPledgeEntity;
    }

    public UserPledgeEntity toUserPledge(UserPledgeModel userPledgeModel, UserDetailsEntity userDetailsEntity,
            CampaignEntity campaignEntity) {
        UserPledgeEntity userPledgeEntity = new UserPledgeEntity();
        return toUserPledge(userPledgeModel, userPledgeEntity, userDetailsEntity, campaignEntity);
    }

}
