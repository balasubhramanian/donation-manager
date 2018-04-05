package com.bala.donation.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.bala.donation.user.rest.model.User;

import io.swagger.annotations.ApiOperation;

public interface UserController {

    // public static final String HAS_AUTHORITY_DEBIT_API =
    // "hasAuthority('DEBIT_API')";

    @ApiOperation(value = "View allUsers", response = User.class, responseContainer = "List")
    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public ResponseEntity<?> getAllUsers();

    // @PreAuthorize(HAS_AUTHORITY_DEBIT_API)
    // ResponseEntity<?> getAllRoles();
}
