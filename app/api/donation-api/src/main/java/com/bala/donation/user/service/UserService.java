package com.bala.donation.user.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bala.donation.common.exception.AppException;
import com.bala.donation.common.exception.UserError;
import com.bala.donation.user.entity.RoleEntity;
import com.bala.donation.user.entity.RolePermissionEntity;
import com.bala.donation.user.entity.UserDetailsEntity;
import com.bala.donation.user.entity.UserLoginEntity;
import com.bala.donation.user.entity.UserRoleEntity;
import com.bala.donation.user.mapper.UserMapper;
import com.bala.donation.user.repo.RoleRepo;
import com.bala.donation.user.repo.UserDetailsRepo;
import com.bala.donation.user.repo.UserLoginRepo;
import com.bala.donation.user.repo.UserRoleRepo;
import com.bala.donation.user.rest.model.PermissionModel;
import com.bala.donation.user.rest.model.RoleModel;
import com.bala.donation.user.rest.model.User;

@Component
public class UserService {

    @Autowired UserMapper userMapper;

    @Autowired UserLoginRepo userLoginRepo;

    @Autowired UserDetailsRepo userDetailsRepo;

    @Autowired UserRoleRepo userRoleRepo;

    @Autowired UserLoginRepo userRepo;

    @Autowired private RoleRepo roleRepo;

    public List<User> getAllUsers() {
        List<UserLoginEntity> userEntities = userLoginRepo.findAll();
        List<User> users = userMapper.toUser(userEntities);
        return users;
    }

    @Transactional
    public void saveUser(User user) {
        UserLoginEntity userLoginEntity = userMapper.toUserEntity(user);
        userLoginEntity.setPassword(user.getPassword());
        UserDetailsEntity userDetailsEntity = userMapper.toUserDetailsEntity(user);
        userDetailsEntity.setUserLogin(userLoginEntity);

        userLoginRepo.save(userLoginEntity);
        userDetailsRepo.save(userDetailsEntity);

        addRoleToUser(userLoginEntity.getId(), user.getRoles());
    }

    public User getUserForLogin(String username) {
        UserLoginEntity userEntity = userLoginRepo.findByUsername(username);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }

        User user = userMapper.toUser(userEntity);
        user.setPassword(userEntity.getPassword());
        return user;
    }

    public User getUsers(Long userId) {
        UserLoginEntity userEntity = userLoginRepo.findOne(userId);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }
        User user = userMapper.toUser(userEntity);
        user.setRoles(getAllRoleForUser(userId));
        return user;
    }

    @Transactional
    public void updateUser(Long id, User user) {
        UserLoginEntity userEntity = userLoginRepo.findOne(id);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }
        UserDetailsEntity userDetailsEntity = userDetailsRepo.findByUserLoginId(id);
        if (userDetailsEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }
        UserDetailsEntity updatedUserEntity = userMapper.toUserDetailsEntity(userDetailsEntity, user);
        userDetailsRepo.save(updatedUserEntity);

        updateRolesForUser(id, user.getRoles());

    }

    @Transactional
    public void deleteUser(Long id) {
        UserLoginEntity userEntity = userLoginRepo.findOne(id);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }
        userRoleRepo.deleteByUserId(id);
        userDetailsRepo.deleteByUserLoginId(id);
        userLoginRepo.delete(userEntity);
    }

    public List<PermissionModel> getAllPermissionForUser(Long id) {
        List<RolePermissionEntity> rolePermissions = userRoleRepo.findAllPermissionForUser(id);

        List<PermissionModel> permissions = new ArrayList<>();
        rolePermissions.forEach((rolePermission) -> {
            PermissionModel model = new PermissionModel();
            model.setName(rolePermission.getPermission().getName());
            permissions.add(model);
        });

        return permissions;
    }

    @Transactional
    public void addRoleToUser(Long userId, List<RoleModel> roleModels) {
        if (CollectionUtils.isEmpty(roleModels)) {
            return;
        }

        UserLoginEntity userEntity = userRepo.findOne(userId);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }

        roleModels.forEach((roleModel) -> {
            RoleEntity roleEntity = roleRepo.findOne(roleModel.getId());
            if (roleEntity == null) {
                throw new AppException(UserError.ROLE_NOT_FOUND);
            }

            UserRoleEntity userRoleEntity = new UserRoleEntity();
            userRoleEntity.setUser(userEntity);
            userRoleEntity.setRole(roleEntity);
            userRoleRepo.save(userRoleEntity);
        });

    }

    @Transactional
    public void removeRoleFromUser(Long userId, List<RoleModel> roleModels) {
        UserLoginEntity userEntity = userRepo.findOne(userId);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }

        roleModels.forEach((roleModel) -> {
            RoleEntity roleEntity = roleRepo.findOne(roleModel.getId());
            if (roleEntity == null) {
                throw new AppException(UserError.ROLE_NOT_FOUND);
            }

            UserRoleEntity userRoleEntity = userRoleRepo.findByUserIdAndRoleId(userEntity.getId(), roleEntity.getId());
            if (userRoleEntity == null) {
                throw new AppException(UserError.ROLE_NOT_AVAILABLE_FOR_USER);
            }
            userRoleRepo.delete(userRoleEntity);
        });

    }

    private void updateRolesForUser(Long userId, List<RoleModel> roles) {
        List<UserRoleEntity> userRoleEntities = userRoleRepo.findByUserId(userId);

        for (UserRoleEntity entity : userRoleEntities) {
            boolean isAvailabeInNewRole = false;
            for (RoleModel roleModel : roles) {
                if (entity.getRole().getId().equals(roleModel.getId())) {
                    isAvailabeInNewRole = true;
                    break;
                }
            }
            // Is in db but, not in new roles
            if (!isAvailabeInNewRole) {
                userRoleRepo.delete(entity);
            }
        }

        // Finding Roles not available already
        List<RoleModel> toBeAdded = roles.stream().filter((roleModel) -> {
            for (UserRoleEntity entity : userRoleEntities) {
                if (entity.getRole().getId().equals(roleModel.getId())) {
                    return false;
                }
            }

            return true;
        }).collect(Collectors.toList());

        addRoleToUser(userId, toBeAdded);
    }

    public List<RoleModel> getAllRoleForUser(Long userId) {
        UserLoginEntity userEntity = userRepo.findOne(userId);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }

        List<UserRoleEntity> userRoleEntities = userRoleRepo.findByUserId(userEntity.getId());

        List<RoleModel> roleModels = userRoleEntities.stream().map((userRole) -> {
            RoleModel roleModel = new RoleModel();
            roleModel.setId(userRole.getRole().getId());
            roleModel.setName(userRole.getRole().getName());
            roleModel.setDescription(userRole.getRole().getDescription());
            return roleModel;
        }).collect(Collectors.toList());

        return roleModels;
    }

}
