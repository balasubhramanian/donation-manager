package com.bala.donation.user.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bala.donation.common.exception.AppException;
import com.bala.donation.common.exception.UserError;
import com.bala.donation.user.entity.RolePermissionEntity;
import com.bala.donation.user.entity.UserEntity;
import com.bala.donation.user.mapper.UserMapper;
import com.bala.donation.user.repo.RolePermissionRepo;
import com.bala.donation.user.repo.UserRepo;
import com.bala.donation.user.repo.UserRoleRepo;
import com.bala.donation.user.rest.model.PermissionModel;
import com.bala.donation.user.rest.model.User;

@Component
public class UserService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    UserRepo userRepo;

    @Autowired
    RolePermissionRepo rolePermissionRepo;

    @Autowired
    UserRoleRepo userRoleRepo;

    public List<User> getAllUsers() {
        List<UserEntity> userEntities = userRepo.findAll();
        List<User> users = userMapper.toUser(userEntities);
        return users;
    }

    @Transactional
    public void saveUser(User user) {
        UserEntity userEntity = userMapper.toUserEntity(user);
        userEntity.setPassword(user.getPassword());
        userRepo.save(userEntity);
    }

    public User getUserForLogin(String username) {
        UserEntity userEntity = userRepo.findByUsername(username);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }

        User user = userMapper.toUser(userEntity);
        user.setPassword(userEntity.getPassword());
        return user;
    }

    public User getUsers(Long id) {
        UserEntity userEntity = userRepo.findOne(id);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }
        User user = userMapper.toUser(userEntity);
        return user;
    }

    public void updateUser(Long id, User user) {
        UserEntity userEntity = userRepo.findOne(id);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }
        UserEntity updatedUserEntity = userMapper.toUserEntity(user);
        userRepo.save(updatedUserEntity);
    }

    @Transactional
    public void deleteUser(Long id) {
        UserEntity userEntity = userRepo.findOne(id);
        if (userEntity == null) {
            throw new AppException(UserError.USER_NOT_FOUND);
        }
        userRoleRepo.deleteByUserId(id);
        userRepo.delete(userEntity);
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
