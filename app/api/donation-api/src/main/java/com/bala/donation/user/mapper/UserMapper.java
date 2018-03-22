package com.bala.donation.user.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.bala.donation.user.entity.UserEntity;
import com.bala.donation.user.rest.model.User;

@Component
public class UserMapper {

    public List<User> toUser(List<UserEntity> userEntities) {
        if (userEntities == null) {
            return new ArrayList<>();
        }

        List<User> users = userEntities.stream().map(this::toUser).collect(Collectors.toList());
        ;
        return users;
    }

    public User toUser(UserEntity userEntity) {
        User user = new User();
        user.setEmail(userEntity.getEmail());
        user.setFirstname(userEntity.getFirstname());
        user.setId(userEntity.getId());
        user.setLastname(userEntity.getLastname());
        user.setPhone(userEntity.getPhone());
        user.setUsername(userEntity.getUsername());
        return user;
    }

    public UserEntity toUserEntity(User user) {
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(user.getEmail());
        userEntity.setFirstname(user.getFirstname());
        // userEntity.setId(user.getId());
        userEntity.setLastname(user.getLastname());
        userEntity.setPhone(user.getPhone());
        userEntity.setUsername(user.getUsername());
        return userEntity;
    }

}
