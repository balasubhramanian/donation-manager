package com.bala.donation.user.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bala.donation.user.entity.UserEntity;

public interface UserRepo extends JpaRepository<UserEntity, Long> {

    UserEntity findByUsername(String username);

}
