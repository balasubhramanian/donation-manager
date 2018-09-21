package com.bala.donation.common.config;

import java.text.SimpleDateFormat;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.bala.donation.common.constants.AppConstants;

@Configuration
public class WebConfiguration extends WebMvcConfigurerAdapter {
    /*
     * @Bean ServletRegistrationBean h2servletRegistration() {
     * ServletRegistrationBean registrationBean = new ServletRegistrationBean(new
     * WebServlet()); registrationBean.addUrlMappings("/console/*"); return
     * registrationBean; }
     */

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*").allowedMethods("*");
            }
        };
    }

    @Bean
    public Jackson2ObjectMapperBuilder jacksonBuilder() {
        Jackson2ObjectMapperBuilder b = new Jackson2ObjectMapperBuilder();
        b.indentOutput(true).dateFormat(new SimpleDateFormat(AppConstants.DATE_FORMAT));
        return b;
    }
}