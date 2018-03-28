package com.bala.donation.user.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bala.donation.user.entity.UserDetailsEntity;

public interface UserDetailsRepo extends JpaRepository<UserDetailsEntity, Long> {

}
