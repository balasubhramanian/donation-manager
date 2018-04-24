package com.bala.donation.userpledge.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bala.donation.campaign.entity.CampaignEntity;
import com.bala.donation.campaign.repo.CampaignRepo;
import com.bala.donation.common.exception.AppException;
import com.bala.donation.common.exception.DonationError;
import com.bala.donation.common.exception.UserError;
import com.bala.donation.user.entity.UserDetailsEntity;
import com.bala.donation.user.repo.UserDetailsRepo;
import com.bala.donation.userpledge.entity.UserPledgeEntity;
import com.bala.donation.userpledge.mapper.UserPledgeMapper;
import com.bala.donation.userpledge.model.UserPledgeModel;
import com.bala.donation.userpledge.repo.UserPledgeRepo;

@Component
public class UserPledgeService {

    @Autowired
    UserPledgeRepo userPledgeRepo;

    @Autowired
    CampaignRepo campaignRepo;

    @Autowired
    UserDetailsRepo userDetailsRepo;

    @Autowired
    UserPledgeMapper userPledgeMapper;

    public List<UserPledgeModel> getAllUserPledges(long userId) {
        List<UserPledgeEntity> userPledgeEntities = userPledgeRepo.findByUserDetailsId(userId);
        List<UserPledgeModel> users = userPledgeMapper.toUserPledge(userPledgeEntities);
        return users;
    }

    @Transactional
    public void saveUserPledge(UserPledgeModel userPledge) {

        CampaignEntity campaignEntity = campaignRepo.findOne(userPledge.getCampaignId());

        if (campaignEntity == null) {
            throw new AppException(DonationError.CAMPAIGN_NOT_FOUND);
        }

        UserDetailsEntity userDetailsEntity = userDetailsRepo.findOne(userPledge.getDonorId());

        if (userDetailsEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }

        UserPledgeEntity userPledgeEntity = userPledgeMapper.toUserPledge(userPledge, userDetailsEntity,
                campaignEntity);
        userPledgeRepo.save(userPledgeEntity);
    }

    @Transactional
    public void deleteUserPledge(Long userId, Long id) {
        UserPledgeEntity userPledgeEntity = userPledgeRepo.findByUserDetailsIdAndId(userId, id);
        if (userPledgeEntity == null) {
            throw new AppException(DonationError.USER_PLEDGE_NOT_FOUND);
        }
        userPledgeRepo.delete(userPledgeEntity);
    }

}
