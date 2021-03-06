package com.bala.donation.donor.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;
import javax.transaction.Transactional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.bala.donation.common.exception.AppException;
import com.bala.donation.common.exception.DonationError;
import com.bala.donation.donor.model.DonorSearchModel;
import com.bala.donation.user.entity.UserDetailsEntity;
import com.bala.donation.user.mapper.UserMapper;
import com.bala.donation.user.model.DonorModel;
import com.bala.donation.user.repo.UserDetailsRepo;;

@Component
public class DonorService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    UserDetailsRepo userDetailsRepo;

    @Transactional
    public void saveDonor(DonorModel donor) {
        UserDetailsEntity userDetailsEntity = userMapper.toUserDetailsEntity(donor);
        userDetailsRepo.save(userDetailsEntity);
    }

    @Transactional
    public void saveDonor(List<DonorModel> donorModels) {
        donorModels.forEach(this::saveDonor);
    }

    public DonorModel getDonor(Long donorId) {
        UserDetailsEntity donorEntity = userDetailsRepo.getOne(donorId);
        if (donorEntity == null) {
            throw new AppException(DonationError.DONOR_NOT_FOUND);
        }
        DonorModel donor = userMapper.toUserDetails(donorEntity);
        return donor;
    }

    @Transactional
    public void updateDonor(Long id, DonorModel user) {

        UserDetailsEntity userDetailsEntity = userDetailsRepo.getOne(id);
        if (userDetailsEntity == null) {
            throw new AppException(DonationError.DONOR_NOT_FOUND);
        }
        UserDetailsEntity updatedUserEntity = userMapper.toUserDetailsEntity(userDetailsEntity, user);
        userDetailsRepo.save(updatedUserEntity);

    }

    @Transactional
    public void deleteDonor(Long id) {
        UserDetailsEntity userEntity = userDetailsRepo.getOne(id);
        if (userEntity == null) {
            throw new AppException(DonationError.DONOR_NOT_FOUND);
        }
        userDetailsRepo.delete(userEntity);
    }

    public List<DonorModel> getAllDonor(DonorSearchModel donor) {
        Sort orderByIdDesc = new Sort(Sort.Direction.DESC, "id");
        List<UserDetailsEntity> userDetailsEntities = userDetailsRepo.findAll(findByIdOrNameOrStreetOrArea(donor),
                orderByIdDesc);
        return userMapper.toUserDetails(userDetailsEntities);
    }

    private Specification<UserDetailsEntity> findByIdOrNameOrStreetOrArea(DonorSearchModel donorSearchModel) {
        return (root, query, cb) -> {
            if (donorSearchModel.getId() != null && donorSearchModel.getId() > 0) {
                return cb.equal(root.get("id"), donorSearchModel.getId());
            }

            if (StringUtils.isNotBlank(donorSearchModel.getPhone())) {
                return cb.equal(root.get("phone"), donorSearchModel.getPhone());
            }

            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.isNotBlank(donorSearchModel.getName())) {
                predicates.add(cb.like(root.get("firstname"), "%" + donorSearchModel.getName() + "%"));
            }

            if (StringUtils.isNotBlank(donorSearchModel.getArea())) {
                predicates.add(cb.like(root.get("area"), "%" + donorSearchModel.getArea() + "%"));
            }

            if (StringUtils.isNotBlank(donorSearchModel.getStreet())) {
                predicates.add(cb.like(root.get("street"), "%" + donorSearchModel.getStreet() + "%"));
            }

            if (predicates.size() > 0) {
                return cb.or(predicates.toArray(new Predicate[predicates.size()]));
            } else {
                return null;
            }

        };
    }

}
