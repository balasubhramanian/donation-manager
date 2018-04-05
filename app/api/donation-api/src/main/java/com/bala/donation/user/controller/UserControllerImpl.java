package com.bala.donation.user.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bala.donation.user.rest.model.RoleModel;
import com.bala.donation.user.rest.model.User;
import com.bala.donation.user.service.UserService;

@RestController
public class UserControllerImpl implements UserController {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired UserService userService;

    @Override
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @RequestMapping(path = "/user", method = RequestMethod.POST)
    public ResponseEntity<?> save(@Valid @RequestBody User user) {
        userService.saveUser(user);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(path = "/user/{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable("id") Long id) {
        return userService.getUsers(id);
    }

    @RequestMapping(path = "/user/{id}", method = RequestMethod.POST)
    public void updateUser(@PathVariable("id") Long id, @Valid @RequestBody User user) {
        userService.updateUser(id, user);
    }

    @RequestMapping(path = "/user/{id}", method = RequestMethod.DELETE)
    public @ResponseBody void deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
    }

    @RequestMapping(path = "/user/{id}/role", method = RequestMethod.POST)
    public void addRoleToUser(@PathVariable("id") Long userId, @Valid @RequestBody List<RoleModel> roleModels) {
        userService.addRoleToUser(userId, roleModels);
    }

    @RequestMapping(path = "/user/{id}/role", method = RequestMethod.DELETE)
    public void removeRoleFromUser(@PathVariable("id") Long userId, @Valid @RequestBody List<RoleModel> roleModels) {
        userService.removeRoleFromUser(userId, roleModels);
    }

    @RequestMapping(path = "/user/{id}/role", method = RequestMethod.GET)
    public List<RoleModel> getAllRoleForUser(@PathVariable("id") Long userId) {
        return userService.getAllRoleForUser(userId);
    }

}
