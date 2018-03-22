package com.bala.donation.user.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bala.donation.user.entity.RolePermissionEntity;

public interface RolePermissionRepo extends JpaRepository<RolePermissionEntity, Long> {

    List<RolePermissionEntity> findByRoleId(Long id);

    RolePermissionEntity findByRoleIdAndPermissionId(Long roleId, Long permissionId);

    @Query("select e from RolePermissionEntity e where e.role.id in ( select f.role.id  from UserRoleEntity f where user.id = :userId)")
    List<RolePermissionEntity> findAllPermissionForUser(@Param("userId") Long userId);
}
