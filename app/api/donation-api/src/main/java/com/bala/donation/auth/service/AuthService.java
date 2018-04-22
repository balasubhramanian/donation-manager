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

import com.bala.donation.auth.model.AppUserDetails;
import com.bala.donation.user.model.PermissionModel;
import com.bala.donation.user.model.UserModel;
import com.bala.donation.user.service.UserService;

@Component
public class AuthService implements UserDetailsService {

    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserModel user = userService.getUserForLogin(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        List<PermissionModel> permissions = userService.getAllPermissionForUser(user.getId());

        Set<GrantedAuthority> authorities = permissions.stream().map((permission) -> {
            GrantedAuthority authority = new SimpleGrantedAuthority(permission.getName());
            return authority;
        }).collect(Collectors.toSet());

        AppUserDetails userDetails = new AppUserDetails(username, user.getPassword(), authorities);
        userDetails.setFirstname(user.getFirstname());
        return userDetails;
    }

}
