package com.bala.donation.campaign.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Component;

import com.bala.donation.campaign.entity.CampaignEntity;
import com.bala.donation.campaign.model.CampaignModel;
import com.bala.donation.user.entity.ConfigEntity;

@Component
public class CampaignMapper {

    public List<CampaignModel> toCampaign(List<CampaignEntity> campaignEntities) {
        if (CollectionUtils.isEmpty(campaignEntities)) {
            return new ArrayList<>();
        }

        List<CampaignModel> campaigns = campaignEntities.stream().map(this::toCampaign).collect(Collectors.toList());
        return campaigns;
    }

    public CampaignModel toCampaign(CampaignEntity entity) {
        CampaignModel model = new CampaignModel();
        model.setDescription(entity.getDescription());
        model.setEndDate(entity.getEndDate());
        model.setId(entity.getId());
        model.setName(entity.getName());
        model.setStartDate(entity.getStartDate());
        model.setStatus(entity.getStatus());
        model.setType(entity.getType().getName());
        model.setTypeId(entity.getType().getId());
        return model;
    }

    public CampaignEntity toCampaign(CampaignModel model, CampaignEntity entity, ConfigEntity type) {

        entity.setDescription(model.getDescription());
        entity.setEndDate(model.getEndDate());
        if (model.getId() != null) {
            entity.setId(model.getId());
        }
        entity.setName(model.getName());
        entity.setStartDate(model.getStartDate());
        entity.setStatus(model.getStatus());
        entity.setType(type);
        return entity;

    }

    public CampaignEntity toCampaign(CampaignModel model, ConfigEntity type) {
        CampaignEntity entity = new CampaignEntity();
        return toCampaign(model, entity, type);
    }

}
