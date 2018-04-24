package com.bala.donation.donation.repo;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.bala.donation.donation.entity.DonationEntity;

public interface DonationCustomRepo {

    List<DonationEntity> getDonations(Specification<DonationEntity> specification);
}
