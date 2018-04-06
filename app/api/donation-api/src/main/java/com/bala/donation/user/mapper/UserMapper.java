package com.bala.donation.user.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.bala.donation.user.entity.UserDetailsEntity;
import com.bala.donation.user.entity.UserLoginEntity;
import com.bala.donation.user.rest.model.Donor;
import com.bala.donation.user.rest.model.User;

@Component
public class UserMapper {

    public List<User> toUser(List<UserLoginEntity> userEntities) {
        if (userEntities == null) {
            return new ArrayList<>();
        }

        List<User> users = userEntities.stream().map(this::toUser).collect(Collectors.toList());
        return users;
    }

    public User toUser(UserLoginEntity userEntity) {
        User user = new User();
        toUserDetails(userEntity.getUserDetails(), user);
        user.setId(userEntity.getId());
        user.setUsername(userEntity.getUsername());
        return user;
    }

    public List<Donor> toUserDetails(List<UserDetailsEntity> userDetailsEntities) {
        if (userDetailsEntities == null) {
            return new ArrayList<>();
        }

        List<Donor> users = userDetailsEntities.stream().map(this::toUserDetails).collect(Collectors.toList());

        return users;
    }

    public Donor toUserDetails(UserDetailsEntity entity) {
        Donor donor = new Donor();
        toUserDetails(entity, donor);
        return donor;
    }

    public void toUserDetails(UserDetailsEntity entity, Donor donor) {
        if (entity == null)
            return;

        donor.setId(entity.getId());
        donor.setFirstname(entity.getFirstname());
        donor.setLastname(entity.getLastname());

        donor.setPhone(entity.getPhone());
        donor.setEmail(entity.getEmail());

        donor.setDoorno(entity.getDoorno());
        donor.setStreet(entity.getStreet());
        donor.setArea(entity.getArea());
        donor.setCity(entity.getCity());
        donor.setState(entity.getState());
        donor.setCountry(entity.getCountry());
    }

    public UserLoginEntity toUserEntity(User user) {
        UserLoginEntity userEntity = new UserLoginEntity();
        userEntity.setId(user.getId());
        userEntity.setUsername(user.getUsername());
        return userEntity;
    }

    public UserDetailsEntity toUserDetailsEntity(Donor donor) {
        UserDetailsEntity entity = new UserDetailsEntity();
        return toUserDetailsEntity(entity, donor);
    }

    public UserDetailsEntity toUserDetailsEntity(UserDetailsEntity entity, Donor donor) {
        entity.setFirstname(donor.getFirstname());
        entity.setLastname(donor.getLastname());

        entity.setPhone(donor.getPhone());
        entity.setEmail(donor.getEmail());

        entity.setDoorno(donor.getDoorno());
        entity.setStreet(donor.getStreet());
        entity.setArea(donor.getArea());
        entity.setCity(donor.getCity());
        entity.setState(donor.getState());
        entity.setCountry(donor.getCountry());
        return entity;
    }

}
