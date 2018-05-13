package com.bala.donation.auth.config;

import java.lang.reflect.Method;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.WebMvcRegistrationsAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.condition.PatternsRequestCondition;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import com.bala.donation.auth.service.AuthService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class JWTConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    AuthService authService;
    @Autowired
    JWTAuthenticationFilter jwtAuthenticationFilter;

    // @Bean
    public WebMvcRegistrationsAdapter webMvcRegistrationsHandlerMapping() {
        return new WebMvcRegistrationsAdapter() {
            @Override
            public RequestMappingHandlerMapping getRequestMappingHandlerMapping() {
                return new RequestMappingHandlerMapping() {
                    private final static String API_BASE_PATH = "api";

                    @Override
                    protected void registerHandlerMethod(Object handler, Method method, RequestMappingInfo mapping) {
                        Class<?> beanType = method.getDeclaringClass();
                        if (AnnotationUtils.findAnnotation(beanType, RestController.class) != null) {
                            PatternsRequestCondition apiPattern = new PatternsRequestCondition(API_BASE_PATH)
                                    .combine(mapping.getPatternsCondition());

                            mapping = new RequestMappingInfo(mapping.getName(), apiPattern,
                                    mapping.getMethodsCondition(), mapping.getParamsCondition(),
                                    mapping.getHeadersCondition(), mapping.getConsumesCondition(),
                                    mapping.getProducesCondition(), mapping.getCustomCondition());
                        }

                        super.registerHandlerMethod(handler, method, mapping);
                    }
                };
            }
        };
    }

    // @Bean
    // public JWTAuthenticationFilter JWTAuthenticationFilter(){
    // return new JWTAuthenticationFilter();
    // }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests().antMatchers("/").permitAll().antMatchers("/static/**")
                .permitAll().antMatchers("/console/**").permitAll().antMatchers("/swagger-ui.html").permitAll()
                .antMatchers("/swagger-resources/**").permitAll().antMatchers("/webjars/**").permitAll()
                .antMatchers("/v2/api-docs/**").permitAll().antMatchers(HttpMethod.POST, "/login").permitAll()
                .anyRequest().authenticated().and()
                // We filter the api/login requests
                // .addFilterBefore(new JWTLoginFilter("/login", authenticationManager()),
                // UsernamePasswordAuthenticationFilter.class)
                // And filter other requests to check the presence of JWT in header
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authService).passwordEncoder(getEncoder());
    }

    @Bean
    public PasswordEncoder getEncoder() {
        PasswordEncoder encoder = NoOpPasswordEncoder.getInstance();
        return encoder;
    }
}