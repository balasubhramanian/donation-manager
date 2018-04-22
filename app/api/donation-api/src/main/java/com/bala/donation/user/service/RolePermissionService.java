package com.bala.donation.user.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bala.donation.common.constants.AppConstants;
import com.bala.donation.common.exception.AppException;
import com.bala.donation.common.exception.UserError;
import com.bala.donation.user.entity.PermissionEntity;
import com.bala.donation.user.entity.RoleEntity;
import com.bala.donation.user.entity.RolePermissionEntity;
import com.bala.donation.user.model.PermissionModel;
import com.bala.donation.user.model.RoleModel;
import com.bala.donation.user.repo.PermisssionRepo;
import com.bala.donation.user.repo.RolePermissionRepo;
import com.bala.donation.user.repo.RoleRepo;

@Component
public class RolePermissionService {

    @Autowired RoleRepo roleRepo;
    @Autowired PermisssionRepo permissionRepo;
    @Autowired RolePermissionRepo rolePermissionRepo;

    @Transactional
    public void saveRole(RoleModel roleModel) {
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setName(roleModel.getName());
        roleEntity.setDescription(roleModel.getDescription());
        roleRepo.save(roleEntity);
    }

    public List<RoleModel> getAllRoles() {
        List<RoleEntity> roles = roleRepo.findAll();

        List<RoleModel> rolesModels = roles.stream().map((role) -> {
            RoleModel roleModel = new RoleModel();
            roleModel.setId(role.getId());
            roleModel.setName(role.getName());
            roleModel.setDescription(role.getDescription());
            return roleModel;
        }).collect(Collectors.toList());
        return rolesModels;
    }

    @Transactional
    public void savePermission(PermissionModel permissionModel) {
        PermissionEntity permissionEntity = new PermissionEntity();
        permissionEntity.setName(permissionModel.getName());
        permissionEntity.setDescription(permissionModel.getDescription());
        permissionRepo.save(permissionEntity);
    }

    @Transactional
    public void disablePermission(Long permissionId) {
        PermissionEntity permissionEntity = permissionRepo.findOne(permissionId);
        if (permissionEntity == null) {
            throw new AppException(UserError.PERMISSION_NOT_FOUND);
        }

        permissionEntity.setStatus(AppConstants.STATUS_INACTIVE);
        permissionRepo.save(permissionEntity);
    }

    public List<PermissionModel> getAllPermission() {
        List<PermissionEntity> permissionEntities = permissionRepo.findAll();

        List<PermissionModel> permissionModels = permissionEntities.stream().map((permission) -> {
            PermissionModel permissionModel = new PermissionModel();
            permissionModel.setId(permission.getId());
            permissionModel.setName(permission.getName());
            permissionModel.setDescription(permission.getDescription());
            return permissionModel;
        }).collect(Collectors.toList());
        return permissionModels;
    }

    @Transactional
    public void addPermissionToRole(Long roleId, List<PermissionModel> permissionModels) {
        RoleEntity roleEntity = roleRepo.findOne(roleId);
        if (roleEntity == null) {
            throw new AppException(UserError.ROLE_NOT_FOUND);
        }

        permissionModels.forEach((permissionModel) -> {
            PermissionEntity permissionEntity = permissionRepo.findOne(permissionModel.getId());
            if (permissionEntity == null) {
                throw new AppException(UserError.PERMISSION_NOT_FOUND);
            }

            RolePermissionEntity rolePermissionEntity = new RolePermissionEntity();
            rolePermissionEntity.setRole(roleEntity);
            rolePermissionEntity.setPermission(permissionEntity);
            rolePermissionRepo.save(rolePermissionEntity);
        });
    }

    @Transactional
    public void removePermissionFromRole(Long roleId, List<PermissionModel> permissionModels) {
        RoleEntity roleEntity = roleRepo.findOne(roleId);
        if (roleEntity == null) {
            throw new AppException(UserError.ROLE_NOT_FOUND);
        }

        permissionModels.forEach((permissionModel) -> {
            PermissionEntity permissionEntity = permissionRepo.findOne(permissionModel.getId());
            if (permissionEntity == null) {
                throw new AppException(UserError.PERMISSION_NOT_FOUND);
            }

            RolePermissionEntity rolePermissionEntity = rolePermissionRepo
                    .findByRoleIdAndPermissionId(roleEntity.getId(), permissionEntity.getId());

            if (rolePermissionEntity == null) {
                throw new AppException(UserError.PERMISSION_NOT_AVAILABLE_FOR_ROLE);
            }

            rolePermissionRepo.delete(rolePermissionEntity);
        });

    }

    public List<PermissionModel> getAllPermissionforRole(Long roleId) {
        List<RolePermissionEntity> rolePermissionEntities = rolePermissionRepo.findByRoleId(roleId);
        if (CollectionUtils.isEmpty(rolePermissionEntities)) {
            return new ArrayList<>();
        }

        List<PermissionModel> permissions = rolePermissionEntities.stream().map((rolePermission) -> {
            PermissionModel model = new PermissionModel();
            PermissionEntity permission = rolePermission.getPermission();
            model.setId(permission.getId());
            model.setName(permission.getName());
            model.setDescription(permission.getDescription());
            return model;
        }).collect(Collectors.toList());
        return permissions;
    }
}
