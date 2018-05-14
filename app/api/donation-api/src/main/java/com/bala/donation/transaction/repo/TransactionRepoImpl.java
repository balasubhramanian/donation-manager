package com.bala.donation.transaction.repo;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;

import com.bala.donation.common.entity.RepoConstants;
import com.bala.donation.transaction.model.LedgerEntryDTO;

public class TransactionRepoImpl implements TransactionCustomRepo {

    @PersistenceContext
    EntityManager entityManager;

    @SuppressWarnings("unchecked")
    @Override
    @Transactional
    public List<LedgerEntryDTO> findDailyLedgerTransaction(LocalDate fromDate, LocalDate toDate) {

        Session session = (Session) entityManager.getDelegate();
        return session.getNamedQuery(RepoConstants.NQ_DAILY_LEDGER_ENTRIES)
                .setParameter("fromDate", fromDate.format(RepoConstants.YEAR_MONTH_DATE_FORMATTER))
                .setParameter("toDate", toDate.plus(1, ChronoUnit.DAYS).format(RepoConstants.YEAR_MONTH_DATE_FORMATTER))
                .setResultTransformer(Transformers.aliasToBean(LedgerEntryDTO.class)).list();
    }

    @SuppressWarnings("unchecked")
    @Override
    @Transactional
    public List<LedgerEntryDTO> findMonthlyLedgerTransaction(LocalDate fromDate, LocalDate toDate) {
        Session session = (Session) entityManager.getDelegate();

        return session.getNamedQuery(RepoConstants.NQ_MONTLY_TRANSACTION_SUMMARY)
                .setParameter("fromDate", fromDate.format(RepoConstants.YEAR_MONTH_DATE_FORMATTER))
                .setParameter("toDate", toDate.plus(1, ChronoUnit.DAYS).format(RepoConstants.YEAR_MONTH_DATE_FORMATTER))
                .setResultTransformer(Transformers.aliasToBean(LedgerEntryDTO.class)).list();

    }

    @Override
    @Transactional
    public BigDecimal findOpeningBalanceOn(LocalDate date) {
        Session session = (Session) entityManager.getDelegate();
        BigDecimal result = (BigDecimal) session.getNamedQuery(RepoConstants.NQ_ROLLUP_BALANCE)
                .setParameter("date", date.format(RepoConstants.YEAR_MONTH_DATE_FORMATTER)).uniqueResult();

        return Optional.ofNullable(result).orElse(BigDecimal.valueOf(0));

    }

}
