package com.bala.donation.user.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bala.donation.user.entity.UserRoleEntity;

public interface UserRoleRepo extends JpaRepository<UserRoleEntity, Long> {

    UserRoleEntity findByUserIdAndRoleId(Long userId, Long roleId);

    List<UserRoleEntity> findByUserId(Long userId);

    void deleteByUserId(Long userId);

}
