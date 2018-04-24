package com.bala.donation.donation.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bala.donation.donation.entity.DonationEntity;

public interface DonationRepo
        extends JpaRepository<DonationEntity, Long>, JpaSpecificationExecutor<DonationEntity>, DonationCustomRepo {

}
