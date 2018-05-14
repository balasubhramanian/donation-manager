package com.bala.donation.userpledge.repo;

import java.util.List;

import com.bala.donation.donation.dto.UserDonationDTO;
import com.bala.donation.userpledge.model.UserPledgeSearchModel;

public interface UserPledgeCustomRepo {

    List<UserDonationDTO> findUserDonations(UserPledgeSearchModel searchModel);

    List<UserDonationDTO> findUserPledgePaymentForMonthlyCampaign(UserPledgeSearchModel searchModel);

    List<UserDonationDTO> findUserPledgePaymentForYearlyCampaign(UserPledgeSearchModel searchModel);

    List<UserDonationDTO> findUserPledgePaymentForOnceCampaign(UserPledgeSearchModel searchModel);

}
