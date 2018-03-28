package com.bala.donation.user.rest.model;

import javax.validation.constraints.NotNull;

public class Donor {
    private Long id;

    @NotNull
    private String firstname;
    private String lastname;

    private String email;
    @NotNull
    private String phone;

    @NotNull
    private String doorno;
    @NotNull
    private String street;
    private String area;
    @NotNull
    private String city;
    @NotNull
    private String state;
    @NotNull
    private String country;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
