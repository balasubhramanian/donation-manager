package com.bala.donation.user.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bala.donation.user.entity.PermissionEntity;

public interface PermisssionRepo extends JpaRepository<PermissionEntity, Long> {

}
