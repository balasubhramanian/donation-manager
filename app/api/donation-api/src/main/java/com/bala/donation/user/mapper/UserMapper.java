package com.bala.donation.user.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.bala.donation.user.entity.UserDetailsEntity;
import com.bala.donation.user.entity.UserLoginEntity;
import com.bala.donation.user.model.DonorModel;
import com.bala.donation.user.model.UserModel;

@Component
public class UserMapper {

    public List<UserModel> toUser(List<UserLoginEntity> userEntities) {
        if (userEntities == null) {
            return new ArrayList<>();
        }

        List<UserModel> users = userEntities.stream().map(this::toUser).collect(Collectors.toList());
        return users;
    }

    public UserModel toUser(UserLoginEntity userEntity) {
        UserModel user = new UserModel();
        toUserDetails(userEntity.getUserDetails(), user);
        user.setId(userEntity.getId());
        user.setUsername(userEntity.getUsername());
        return user;
    }

    public List<DonorModel> toUserDetails(List<UserDetailsEntity> userDetailsEntities) {
        if (userDetailsEntities == null) {
            return new ArrayList<>();
        }

        List<DonorModel> users = userDetailsEntities.stream().map(this::toUserDetails).collect(Collectors.toList());

        return users;
    }

    public DonorModel toUserDetails(UserDetailsEntity entity) {
        DonorModel donor = new DonorModel();
        toUserDetails(entity, donor);
        return donor;
    }

    public void toUserDetails(UserDetailsEntity entity, DonorModel donor) {
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

    public UserLoginEntity toUserEntity(UserModel user) {
        UserLoginEntity userEntity = new UserLoginEntity();
        userEntity.setId(user.getId());
        userEntity.setUsername(user.getUsername());
        return userEntity;
    }

    public UserDetailsEntity toUserDetailsEntity(DonorModel donor) {
        UserDetailsEntity entity = new UserDetailsEntity();
        return toUserDetailsEntity(entity, donor);
    }

    public UserDetailsEntity toUserDetailsEntity(UserDetailsEntity entity, DonorModel donor) {
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
