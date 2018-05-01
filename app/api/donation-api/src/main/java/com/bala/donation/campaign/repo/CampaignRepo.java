package com.bala.donation.campaign.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bala.donation.campaign.entity.CampaignEntity;

public interface CampaignRepo extends JpaRepository<CampaignEntity, Long> {

    List<CampaignEntity> findByStatus(String status);

}
