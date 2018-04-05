package com.bala.donation.user.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bala.donation.user.entity.RolePermissionEntity;

public interface RolePermissionRepo extends JpaRepository<RolePermissionEntity, Long> {

    List<RolePermissionEntity> findByRoleId(Long id);

    RolePermissionEntity findByRoleIdAndPermissionId(Long roleId, Long permissionId);

}
