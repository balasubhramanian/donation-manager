package com.bala.donation.user.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bala.donation.user.entity.RoleEntity;

public interface RoleRepo extends JpaRepository<RoleEntity, Long> {

}
