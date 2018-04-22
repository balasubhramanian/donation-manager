package com.bala.donation.user.repo.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.bala.donation.donor.model.DonorSearchModel;
import com.bala.donation.user.entity.UserDetailsEntity;
import com.bala.donation.user.repo.UserDetailsCustomRepo;

@Repository
public class UserDetailsRepoImpl implements UserDetailsCustomRepo { // Naming patter should be followed in order to
                                                                    // recognized by spring repo+impl

    @PersistenceContext EntityManager entityManager;

    @Override
    public List<UserDetailsEntity> findDonors(DonorSearchModel donor) {
        return null;
    }

}
