package com.bala.donation.campaign.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bala.donation.campaign.entity.CampaignEntity;
import com.bala.donation.campaign.mapper.CampaignMapper;
import com.bala.donation.campaign.model.CampaignModel;
import com.bala.donation.campaign.model.CampaignSearchModel;
import com.bala.donation.campaign.repo.CampaignRepo;
import com.bala.donation.common.exception.AppException;
import com.bala.donation.common.exception.DonationError;
import com.bala.donation.user.entity.ConfigEntity;
import com.bala.donation.user.repo.ConfigRepo;;

@Component
public class CampaignService {

    @Autowired CampaignRepo campaignRepo;
    @Autowired ConfigRepo configRepo;
    @Autowired CampaignMapper campaignMapper;

    public List<CampaignModel> getAllCampaign(CampaignSearchModel campaign) {
        List<CampaignEntity> campaignEntities = campaignRepo.findAll();
        List<CampaignModel> campaignModels = campaignMapper.toCampaign(campaignEntities);
        return campaignModels;
    }

    @Transactional
    public void saveCampaign(CampaignModel campaign) {
        ConfigEntity configEntity = configRepo.findOne(campaign.getTypeId());

        if (configEntity == null) {
            throw new AppException(DonationError.CAMPAIGN_TYPE_NOT_FOUND);
        }

        CampaignEntity campaignEntity = campaignMapper.toCampaign(campaign, configEntity);
        campaignRepo.save(campaignEntity);
    }

    public CampaignModel getCampaign(Long id) {
        CampaignEntity campaignEntity = campaignRepo.findOne(id);
        if (campaignEntity == null) {
            throw new AppException(DonationError.CAMPAIGN_NOT_FOUND);
        }
        CampaignModel campaignModel = campaignMapper.toCampaign(campaignEntity);
        return campaignModel;
    }

    @Transactional
    public void updateCampaign(Long id, CampaignModel campaign) {
        CampaignEntity campaignEntity = campaignRepo.findOne(id);
        if (campaignEntity == null) {
            throw new AppException(DonationError.CAMPAIGN_NOT_FOUND);
        }
        ConfigEntity configEntity = campaignEntity.getType();
        if (campaignEntity.getType() == null || campaignEntity.getType().getId() != campaign.getTypeId()) {
            configEntity = configRepo.findOne(campaign.getTypeId());
        }

        campaignEntity = campaignMapper.toCampaign(campaign, campaignEntity, configEntity);
        campaignRepo.save(campaignEntity);
    }

    public void deleteCampaign(Long id) {
        CampaignEntity campaignEntity = campaignRepo.findOne(id);
        if (campaignEntity == null) {
            throw new AppException(DonationError.CAMPAIGN_NOT_FOUND);
        }
        campaignRepo.delete(campaignEntity);
    }

}
