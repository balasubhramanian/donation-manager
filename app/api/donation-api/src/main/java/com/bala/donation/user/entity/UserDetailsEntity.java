package com.bala.donation.user.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.bala.donation.common.entity.BaseEntity;

@Entity
@Table(name = "user_details")
public class UserDetailsEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String doorno;
    private String street;
    private String area;
    private String city;
    private String state;
    private String country;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_login_id")
    private UserLoginEntity userLogin;

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDoorno() {
        return doorno;
    }

    public void setDoorno(String doorno) {
        this.doorno = doorno;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public UserLoginEntity getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(UserLoginEntity userLogin) {
        this.userLogin = userLogin;
    }

}
