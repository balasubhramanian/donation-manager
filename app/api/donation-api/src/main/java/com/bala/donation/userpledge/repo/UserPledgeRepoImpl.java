package com.bala.donation.userpledge.repo;

import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.bala.donation.common.entity.RepoConstants;
import com.bala.donation.donation.dto.UserDonationDTO;
import com.bala.donation.userpledge.model.UserPledgeSearchModel;

@Repository
public class UserPledgeRepoImpl implements UserPledgeCustomRepo {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
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
        return session.getNamedQuery(RepoConstants.NQ_USER_PLEDGE_PAYMENT_STATUS_FOR_MONTHLY_CAMPAIGN)
                .setParameter("fromDate", searchModel.getFromDate().format(yearMonthDateFormat))
                .setParameter("toDate", searchModel.getToDate().plus(1, ChronoUnit.DAYS).format(yearMonthDateFormat))
                .setParameter("fromMonthYear", searchModel.getFromDate().format(yearMonthFormat))
                .setParameter("toMonthYear", searchModel.getToDate().format(yearMonthFormat))
                .setParameter("campaignId", searchModel.getCampaignId())
                .setResultTransformer(Transformers.aliasToBean(UserDonationDTO.class)).list();

    }

    @Override
    public List<UserDonationDTO> findUserPledgePaymentForYearlyCampaign(UserPledgeSearchModel searchModel) {
        Session session = (Session) entityManager.getDelegate();

        DateTimeFormatter yearFormat = DateTimeFormatter.ofPattern("yyyy");
        DateTimeFormatter yearMonthDateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return session.getNamedQuery(RepoConstants.NQ_USER_PLEDGE_PAYMENT_STATUS_FOR_YEARLY_CAMPAIGN)
                .setParameter("fromDate", searchModel.getFromDate().format(yearMonthDateFormat))
                .setParameter("toDate", searchModel.getToDate().plus(1, ChronoUnit.DAYS).format(yearMonthDateFormat))
                .setParameter("fromYear", searchModel.getFromDate().format(yearFormat))
                .setParameter("toYear", searchModel.getToDate().format(yearFormat))
                .setParameter("campaignId", searchModel.getCampaignId())
                .setResultTransformer(Transformers.aliasToBean(UserDonationDTO.class)).list();
    }

    @Override
    public List<UserDonationDTO> findUserPledgePaymentForOnceCampaign(UserPledgeSearchModel searchModel) {

        DateTimeFormatter yearMonthFormat = DateTimeFormatter.ofPattern("yyyy-MM");
        DateTimeFormatter yearMonthDateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        Session session = (Session) entityManager.getDelegate();
        return session.getNamedQuery(RepoConstants.NQ_USER_PLEDGE_PAYMENT_STATUS_FOR_ONCE_CAMPAIGN)
                .setParameter("fromDate", searchModel.getFromDate().format(yearMonthDateFormat))
                .setParameter("toDate", searchModel.getToDate().plus(1, ChronoUnit.DAYS).format(yearMonthDateFormat))
                .setParameter("fromMonthYear", searchModel.getFromDate().format(yearMonthFormat))
                .setParameter("toMonthYear", searchModel.getToDate().format(yearMonthFormat))
                .setParameter("campaignId", searchModel.getCampaignId())
                .setResultTransformer(Transformers.aliasToBean(UserDonationDTO.class)).list();
    }

}
