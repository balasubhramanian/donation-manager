package com.bala.donation.auth.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import com.bala.donation.auth.service.AuthService;

@Component
public class JWTAuthenticationFilter extends GenericFilterBean {

    @Autowired
    AuthService authService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {
        Authentication jwtAuthentication = TokenAuthenticationService.getAuthentication((HttpServletRequest) request);

        if (jwtAuthentication == null) {
            filterChain.doFilter(request, response);
            return;
        }

        if (SecurityContextHolder.getContext() != null
                && SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        UserDetails userdetails = authService.loadUserByUsername(jwtAuthentication.getName());
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userdetails.getUsername(), null, userdetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(request, response);
    }
}
