package com.bala.donation.donation.repo;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import com.bala.donation.donation.entity.DonationEntity;
import com.bala.donation.user.entity.UserDetailsEntity;

@Repository
public class DonationRepoImpl implements DonationCustomRepo {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<DonationEntity> getDonations(Specification<DonationEntity> specification) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<DonationEntity> criteriaQuery = criteriaBuilder.createQuery(DonationEntity.class);
        Root<DonationEntity> root = criteriaQuery.from(DonationEntity.class);

        Join<DonationEntity, UserDetailsEntity> userJoin = root.join("userDetails", JoinType.INNER);

        Predicate predicate = specification.toPredicate(root, criteriaQuery, criteriaBuilder);
        criteriaQuery.where(predicate);
        return entityManager.createQuery(criteriaQuery).getResultList();
    }

}
