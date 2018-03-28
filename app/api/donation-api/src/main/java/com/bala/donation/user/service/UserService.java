package com.bala.donation.user.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bala.donation.common.exception.AppException;
import com.bala.donation.common.exception.UserError;
import com.bala.donation.user.entity.RolePermissionEntity;
import com.bala.donation.user.entity.UserDetailsEntity;
import com.bala.donation.user.entity.UserLoginEntity;
import com.bala.donation.user.mapper.UserMapper;
import com.bala.donation.user.repo.RolePermissionRepo;
import com.bala.donation.user.repo.UserDetailsRepo;
import com.bala.donation.user.repo.UserLoginRepo;
import com.bala.donation.user.repo.UserRoleRepo;
import com.bala.donation.user.rest.model.PermissionModel;
import com.bala.donation.user.rest.model.User;

@Component
public class UserService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    UserLoginRepo userLoginRepo;

    @Autowired
    UserDetailsRepo userDetailsRepo;

    @Autowired
    RolePermissionRepo rolePermissionRepo;

    @Autowired
    UserRoleRepo userRoleRepo;

    public List<User> getAllUsers() {
        List<UserLoginEntity> userEntities = userLoginRepo.findAll();
        List<User> users = userMapper.toUser(userEntities);
        return users;
    }

    @Transactional
    public void saveUser(User user) {
        UserLoginEntity userEntity = userMapper.toUserEntity(user);
        userEntity.setPassword(user.getPassword());
        UserDetailsEntity userDetailsEntity = userMapper.toUserDetailsEntity(user);
        userDetailsEntity.setUserLogin(userEntity);
        userLoginRepo.save(userEntity);
        userDetailsRepo.save(userDetailsEntity);
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

    public User getUsers(Long id) {
        UserLoginEntity userEntity = userLoginRepo.findOne(id);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }
        User user = userMapper.toUser(userEntity);
        return user;
    }

    public void updateUser(Long id, User user) {
        UserLoginEntity userEntity = userLoginRepo.findOne(id);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }
        UserLoginEntity updatedUserEntity = userMapper.toUserEntity(user);
        userLoginRepo.save(updatedUserEntity);
    }

    @Transactional
    public void deleteUser(Long id) {
        UserLoginEntity userEntity = userLoginRepo.findOne(id);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }
        userRoleRepo.deleteByUserId(id);
        userLoginRepo.delete(userEntity);
    }

    public List<PermissionModel> getAllPermissionForUser(Long id) {
        List<RolePermissionEntity> rolePermissions = rolePermissionRepo.findAllPermissionForUser(id);

        List<PermissionModel> permissions = new ArrayList<>();
        rolePermissions.forEach((rolePermission) -> {
            PermissionModel model = new PermissionModel();
            model.setName(rolePermission.getPermission().getName());
            permissions.add(model);
        });

        return permissions;
    }

}
