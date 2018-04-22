package com.bala.donation.user.repo;

import java.util.List;

import com.bala.donation.donor.model.DonorSearchModel;
import com.bala.donation.user.entity.UserDetailsEntity;

public interface UserDetailsCustomRepo {
    List<UserDetailsEntity> findDonors(DonorSearchModel donor);

}
