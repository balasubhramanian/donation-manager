package com.bala.donation.userpledge.repo;

import java.util.List;

import com.bala.donation.donation.dto.UserDonationDTO;
import com.bala.donation.userpledge.model.UserPledgeSearchModel;

public interface UserPledgeCustomRepo {

    List<UserDonationDTO> findUserDonations(UserPledgeSearchModel searchModel);
    /**
     * 
     * 
     * 
     * INSERT INTO `dim_month_year` (`month`, `year`) VALUES ('01', 2017), ('02',
     * 2017), ('03', 2017), ('04', 2017), ('05', 2017), ('06', 2017), ('07', 2017),
     * ('08', 2017), ('09', 2017), ('10', 2017), ('11', 2017), ('12', 2017), ('01',
     * 2018), ('02', 2018), ('03', 2018), ('04', 2018), ('05', 2018), ('06', 2018),
     * ('07', 2018), ('08', 2018), ('09', 2018), ('10', 2018), ('11', 2018), ('12',
     * 2018);
     * 
     * 
     * 
     */
}
