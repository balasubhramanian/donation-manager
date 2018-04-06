package com.bala.donation.user.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bala.donation.user.entity.UserDetailsEntity;

public interface UserDetailsRepo extends JpaRepository<UserDetailsEntity, Long>, UserDetailsCustomRepo,
        JpaSpecificationExecutor<UserDetailsEntity> {

    void deleteByUserLoginId(Long id);

    UserDetailsEntity findByUserLoginId(Long id);

}
