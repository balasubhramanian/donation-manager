package com.bala.donation.donation.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.bala.donation.account.entity.AccountEntity;
import com.bala.donation.account.repo.AccountRepo;
import com.bala.donation.campaign.entity.CampaignEntity;
import com.bala.donation.campaign.repo.CampaignRepo;
import com.bala.donation.common.exception.AppException;
import com.bala.donation.common.exception.DonationError;
import com.bala.donation.common.exception.UserError;
import com.bala.donation.donation.entity.DonationEntity;
import com.bala.donation.donation.mapper.DonationMapper;
import com.bala.donation.donation.model.DonationModel;
import com.bala.donation.donation.model.DonationSearchModel;
import com.bala.donation.donation.repo.DonationRepo;
import com.bala.donation.notification.service.NotificationService;
import com.bala.donation.user.entity.UserDetailsEntity;
import com.bala.donation.user.repo.UserDetailsRepo;;

@Component
public class DonationService {

    @Autowired
    CampaignRepo campaignRepo;

    @Autowired
    DonationRepo donationRepo;

    @Autowired
    UserDetailsRepo userDetailsRepo;

    @Autowired
    AccountRepo accountRepo;

    @Autowired
    DonationMapper donationMapper;

    @Autowired
    NotificationService notificationService;

    public List<DonationModel> getAllDonation(DonationSearchModel donationSearchModel) {

        List<DonationEntity> donationEntities = donationRepo.getDonations(findDonationBySpec(donationSearchModel));
        List<DonationModel> donationModel = donationMapper.toDonation(donationEntities);
        return donationModel;
    }

    private Specification<DonationEntity> findDonationBySpec(DonationSearchModel donationSearchModel) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (donationSearchModel.getId() != null && donationSearchModel.getId() > 0) {
                return cb.equal(root.get("id"), donationSearchModel.getId());
            }

            if (donationSearchModel.getDonorId() != null && donationSearchModel.getDonorId() > 0) {
                predicates.add(cb.equal(root.get("userDetails").get("id"), donationSearchModel.getDonorId()));
            }

            if (donationSearchModel.getCampaignId() != null && donationSearchModel.getCampaignId() > 0) {
                predicates.add(cb.equal(root.get("campaign").get("id"), donationSearchModel.getCampaignId()));
            }

            if (donationSearchModel.getAccountId() != null && donationSearchModel.getAccountId() > 0) {
                predicates.add(cb.equal(root.get("account").get("id"), donationSearchModel.getAccountId()));
            }

            if (donationSearchModel.getFromDate() != null) {

                predicates.add(cb.greaterThanOrEqualTo(root.get("date"), donationSearchModel.getFromDate()));
            }

            if (donationSearchModel.getToDate() != null) {

                predicates.add(cb.lessThanOrEqualTo(root.get("date"), donationSearchModel.getToDate()));
            }

            if (donationSearchModel.getAmount() > 0) {
                if (donationSearchModel.getAmountComparator() == 1) {
                    predicates.add(cb.greaterThanOrEqualTo(root.get("amount"), donationSearchModel.getAmount()));
                } else if (donationSearchModel.getAmountComparator() == -1) {
                    predicates.add(cb.lessThanOrEqualTo(root.get("amount"), donationSearchModel.getAmount()));
                } else {
                    predicates.add(cb.equal(root.get("amount"), donationSearchModel.getAmount()));
                }
            }

            return cb.and(predicates.toArray(new Predicate[predicates.size()]));
        };

    }

    @Transactional
    public void saveDonation(DonationModel donationModel) {
        CampaignEntity campaignEntity = campaignRepo.findById(donationModel.getCampaignId()).get();

        if (campaignEntity == null) {
            throw new AppException(DonationError.CAMPAIGN_NOT_FOUND);
        }

        UserDetailsEntity userDetailsEntity = userDetailsRepo.findById(donationModel.getDonorId()).get();

        if (userDetailsEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }

        AccountEntity accountEntity = null;
        if (donationModel.getAccountId() != null) {
            accountEntity = accountRepo.findById(donationModel.getAccountId()).get();
        }

        DonationEntity donationEntity = donationMapper.toDonation(donationModel, campaignEntity, userDetailsEntity,
                accountEntity);

        donationRepo.save(donationEntity);

        notificationService.onDonationRecieved(donationEntity);
    }

    @Transactional
    public void saveDonation(List<DonationModel> donationModels) {
        donationModels.forEach(this::saveDonation);
    }

    public DonationModel getDonation(Long id) {
        DonationEntity donationEntity = donationRepo.getOne(id);
        if (donationEntity == null) {
            throw new AppException(DonationError.DONATION_NOT_FOUND);
        }
        DonationModel donationModel = donationMapper.toDonation(donationEntity);
        return donationModel;
    }

    @Transactional
    public void updateDonation(Long id, DonationModel donationModel) {
        DonationEntity donationEntity = donationRepo.getOne(id);
        if (donationEntity == null) {
            throw new AppException(DonationError.DONATION_NOT_FOUND);
        }

        CampaignEntity campaignEntity = campaignRepo.getOne(donationModel.getCampaignId());

        if (campaignEntity == null) {
            throw new AppException(DonationError.CAMPAIGN_NOT_FOUND);
        }

        UserDetailsEntity userDetailsEntity = userDetailsRepo.getOne(donationModel.getDonorId());

        if (userDetailsEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }

        AccountEntity accountEntity = null;
        if (donationModel.getAccountId() != null) {
            accountEntity = accountRepo.getOne(donationModel.getAccountId());
        }

        donationEntity = donationMapper.toDonation(donationModel, donationEntity, campaignEntity, userDetailsEntity,
                accountEntity);
        donationRepo.save(donationEntity);
    }

    public void deleteDonation(Long id) {
        DonationEntity donationEntity = donationRepo.getOne(id);
        if (donationEntity == null) {
            throw new AppException(DonationError.DONATION_NOT_FOUND);
        }

        donationRepo.delete(donationEntity);
    }

}
