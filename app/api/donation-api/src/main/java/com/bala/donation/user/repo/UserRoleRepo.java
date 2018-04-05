package com.bala.donation.user.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bala.donation.user.entity.RolePermissionEntity;
import com.bala.donation.user.entity.UserRoleEntity;

public interface UserRoleRepo extends JpaRepository<UserRoleEntity, Long> {

    UserRoleEntity findByUserIdAndRoleId(Long userId, Long roleId);

    List<UserRoleEntity> findByUserId(Long userId);

    void deleteByUserId(Long userId);

    @Query("select e from RolePermissionEntity e where e.role.id in ( select f.role.id  from UserRoleEntity f where user.id = :userId)")
    List<RolePermissionEntity> findAllPermissionForUser(@Param("userId") Long userId);
}
