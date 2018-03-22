package com.bala.donation.common.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class WebConfiguration {
    /*
     * @Bean ServletRegistrationBean h2servletRegistration() {
     * ServletRegistrationBean registrationBean = new ServletRegistrationBean(new
     * WebServlet()); registrationBean.addUrlMappings("/console/*"); return
     * registrationBean; }
     */

    // CORS Filter
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean bean = new FilterRegistrationBean();
        bean.setOrder(0);
        return new CorsFilter(source);
    }
}