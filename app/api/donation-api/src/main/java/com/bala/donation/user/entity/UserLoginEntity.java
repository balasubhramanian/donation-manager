package com.bala.donation.user.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.bala.donation.common.entity.BaseEntity;

@Entity
@Table(name = "user_login")
public class UserLoginEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String password;

    @OneToOne(mappedBy = "userLogin", fetch = FetchType.EAGER)
    private UserDetailsEntity userDetails;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserDetailsEntity getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(UserDetailsEntity userDetails) {
        this.userDetails = userDetails;
    }

}
