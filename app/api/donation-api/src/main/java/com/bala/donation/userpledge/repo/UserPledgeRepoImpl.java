package com.bala.donation.userpledge.repo;

import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.bala.donation.donation.dto.UserDonationDTO;
import com.bala.donation.userpledge.model.UserPledgeSearchModel;

@Repository
public class UserPledgeRepoImpl implements UserPledgeCustomRepo {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<UserDonationDTO> findUserDonations(UserPledgeSearchModel searchModel) {

        if (searchModel == null) {
            return Collections.EMPTY_LIST;
        }

        String selectQuery = "select up.user_id,ud.firstname 'user_name', up.campaign_id, c.name 'campaign_name' ,up.amount 'pledged_amount', sum(d.amount) 'paid_amount' , difference(up.amount - sum(d.amount)\n"
                + "from user_pledge up left outer join donation d on up.campaign_id = d.campaign_id and up.user_id = d.user_id  \n"
                + "join user_details ud on up.user_id = ud.id\n" + "join campaign c on up.campaign_id = c.id\n";

        List<String> whereClause = new ArrayList<>();

        if (searchModel.getFromDate() != null) {
            whereClause.add("d.date >= '" + searchModel.getFromDate() + "'");
        }

        if (searchModel.getToDate() != null) {
            whereClause.add("d.date < '" + searchModel.getToDate() + "'");
        }

        if (searchModel.getUserId() != null) {
            whereClause.add("up.user_id =" + searchModel.getUserId());
        }

        if (searchModel.getCampaignId() != null) {
            whereClause.add("up.campaign_id =" + searchModel.getCampaignId());
        }

        String queryGroupBy = "group by  up.user_id,up.campaign_id,up.amount";

        String queryWhereClause = null;
        for (String where : whereClause) {
            if (queryWhereClause == null) {

                queryWhereClause = " where " + where;

            } else {

                queryWhereClause += " and " + where;
            }
        }

        String havingClause = null;
        switch (searchModel.getPaymentStatus()) {

        case NOT_PAID:
            havingClause += " having sum(d.amount)  is null";
            break;

        case PARTIALLY_PAID:

            havingClause += "having abs(up.amount- sum(d.`amount`)) > 0";
            break;

        case COMPLETELY_PAID:
            havingClause += "having abs(up.amount- sum(d.`amount`)) = 0";
            break;

        case NOT_PAID_OR_PARTIALLY_PAID:
            havingClause += " having sum(d.amount)  is null or abs(up.amount- sum(d.`amount`)) > 0 ";
            break;

        default:
            break;
        }

        Session session = (Session) entityManager.getDelegate();

        Query query = session.createSQLQuery(selectQuery + queryWhereClause + queryGroupBy + havingClause);
        query.setResultTransformer(Transformers.aliasToBean(UserDonationDTO.class));
        query.setMaxResults(10);
        return query.list();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<UserDonationDTO> findUserPledgePaymentForMonthlyCampaign(UserPledgeSearchModel searchModel) {
        Session session = (Session) entityManager.getDelegate();

        DateTimeFormatter yearMonthFormat = DateTimeFormatter.ofPattern("yyyy-MM");
        DateTimeFormatter yearMonthDateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return session.getNamedQuery("USER_PLEDGE_PAYMENT_STATUS_FOR_MONTHLY_CAMPAIGN")
                .setParameter("fromDate", searchModel.getFromDate().format(yearMonthDateFormat))
                .setParameter("toDate", searchModel.getToDate().plus(1, ChronoUnit.DAYS).format(yearMonthDateFormat))
                .setParameter("fromMonthYear", searchModel.getFromDate().format(yearMonthFormat))
                .setParameter("toMonthYear", searchModel.getToDate().format(yearMonthFormat))
                .setParameter("campaignId", searchModel.getCampaignId())
                .setResultTransformer(Transformers.aliasToBean(UserDonationDTO.class)).list();

    }

    /*
     * 
     * select * from donation
     * 
     * select * from campaign
     * 
     * select * from user_details
     * 
     * -- donation given by user with in a period select
     * user_details.id,firstname,lastname,campaign_id,amount,date,donation.id from
     * user_details join donation on user_details.id = donation.user_id where date
     * >= '2018-04-01' and date <'2018-04-15'
     * 
     * -- monthly user pledges select * from user_pledge join campaign on
     * campaign_id = campaign.id where type_id in ( select id from config where
     * module ='campaign_type' and name='monthly' )
     * 
     * 
     * select user_details.id,firstname,lastname,campaign_id,amount,date,donation.id
     * from user_details join donation on user_details.id = donation.user_id where
     * campaign_id in ( select id from campaign where type_id in ( select id from
     * config where module ='campaign_type' and name='monthly' ) )
     * 
     * select * from user_pledge where user_id =6 select * from donation where
     * user_id =6
     * 
     * select up.user_id,up.campaign_id,up.amount 'pledged_amount',
     * d.campaign_id,d.date,d.amount from user_pledge up left outer join donation d
     * on up.campaign_id = d.campaign_id and up.user_id = d.user_id
     * 
     * 
     * -- user pledges - amount pledged vs amount paid select
     * up.user_id,up.campaign_id,up.amount 'pledged_amount',sum(d.amount) from
     * user_pledge up left outer join donation d on up.campaign_id = d.campaign_id
     * and up.user_id = d.user_id group by up.user_id,up.campaign_id,up.amount
     * 
     * 
     * -- user pledges yet to be paid select up.user_id,up.campaign_id,up.amount
     * 'pledged_amount',sum(d.amount) from user_pledge up left outer join donation d
     * on up.campaign_id = d.campaign_id and up.user_id = d.user_id group by
     * up.user_id,up.campaign_id,up.amount having sum(d.amount) is null
     * 
     * 
     * -- user pledges be paid select up.user_id,up.campaign_id,up.amount
     * 'pledged_amount',sum(d.amount) from user_pledge up left outer join donation d
     * on up.campaign_id = d.campaign_id and up.user_id = d.user_id group by
     * up.user_id,up.campaign_id,up.amount having sum(d.amount) is not null
     * 
     * -- user pledges with amount difference select
     * up.user_id,up.campaign_id,up.amount, sum(d.amount), ABS(up.amount -
     * sum(d.amount)) from user_pledge up left outer join donation d on
     * up.campaign_id = d.campaign_id and up.user_id = d.user_id group by
     * up.user_id,up.campaign_id,up.amount
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */
}
