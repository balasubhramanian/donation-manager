package com.bala.donation.user.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bala.donation.user.entity.UserLoginEntity;

public interface UserLoginRepo extends JpaRepository<UserLoginEntity, Long> {

    UserLoginEntity findByUsername(String username);

}
