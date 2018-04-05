package com.bala.donation.donor.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bala.donation.common.exception.AppException;
import com.bala.donation.common.exception.DonationError;
import com.bala.donation.user.entity.UserDetailsEntity;
import com.bala.donation.user.mapper.UserMapper;
import com.bala.donation.user.repo.UserDetailsRepo;
import com.bala.donation.user.rest.model.Donor;

@Component
public class DonorService {

    @Autowired UserMapper userMapper;

    @Autowired UserDetailsRepo userDetailsRepo;

    public List<Donor> getAllDonor() {
        List<UserDetailsEntity> userEntities = userDetailsRepo.findAll();
        List<Donor> users = userMapper.toUserDetails(userEntities);
        return users;
    }

    @Transactional
    public void saveDonor(Donor donor) {
        UserDetailsEntity userDetailsEntity = userMapper.toUserDetailsEntity(donor);
        userDetailsRepo.save(userDetailsEntity);
    }

    public Donor getDonor(Long donorId) {
        UserDetailsEntity donorEntity = userDetailsRepo.findOne(donorId);
        if (donorEntity == null) {
            throw new AppException(DonationError.DONOR_NOT_FOUND);
        }
        Donor donor = userMapper.toUserDetails(donorEntity);
        return donor;
    }

    @Transactional
    public void updateDonor(Long id, Donor user) {

        UserDetailsEntity userDetailsEntity = userDetailsRepo.findOne(id);
        if (userDetailsEntity == null) {
            throw new AppException(DonationError.DONOR_NOT_FOUND);
        }
        UserDetailsEntity updatedUserEntity = userMapper.toUserDetailsEntity(userDetailsEntity, user);
        userDetailsRepo.save(updatedUserEntity);

    }

    @Transactional
    public void deleteDonor(Long id) {
        UserDetailsEntity userEntity = userDetailsRepo.findOne(id);
        if (userEntity == null) {
            throw new AppException(DonationError.DONOR_NOT_FOUND);
        }
        userDetailsRepo.delete(userEntity);
    }

}
