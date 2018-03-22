package com.bala.donation.auth.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.bala.donation.user.rest.model.PermissionModel;
import com.bala.donation.user.rest.model.User;
import com.bala.donation.user.service.UserService;

@Component
public class AuthService implements UserDetailsService {

    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userService.getUserForLogin(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        List<PermissionModel> permissions = userService.getAllPermissionForUser(user.getId());

        Set<GrantedAuthority> authorities = permissions.stream().map((permission) -> {
            GrantedAuthority authority = new SimpleGrantedAuthority(permission.getName());
            return authority;
        }).collect(Collectors.toSet());

        org.springframework.security.core.userdetails.User userDetails = new org.springframework.security.core.userdetails.User(
                username, user.getPassword(), authorities);
        return userDetails;
    }

}
