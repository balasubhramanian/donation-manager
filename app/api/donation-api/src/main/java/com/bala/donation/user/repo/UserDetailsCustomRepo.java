package com.bala.donation.user.repo;

import java.util.List;

import com.bala.donation.user.entity.UserDetailsEntity;
import com.bala.donation.user.rest.model.DonorSearchModel;

public interface UserDetailsCustomRepo {
    List<UserDetailsEntity> findDonors(DonorSearchModel donor);

}
