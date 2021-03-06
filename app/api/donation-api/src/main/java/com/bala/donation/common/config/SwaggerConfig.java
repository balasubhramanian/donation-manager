package com.bala.donation.common.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket productApi() {
        return new Docket(DocumentationType.SWAGGER_2).select()
                .apis(RequestHandlerSelectors.basePackage("com.bala.donation")).paths(PathSelectors.any()).build()
                .apiInfo(metaData()).globalOperationParameters(Arrays.asList(addHeader("Authorization", "{{Auth}}"),
                        addHeader("Content-Type", "application/json")));
        // http://localhost:8080/swagger-ui.html

    }

    private Parameter addHeader(String name, String defaultValue) {
        return new ParameterBuilder().name(name).description("JWT Token").modelRef(new ModelRef("string"))
                .parameterType("header").required(false).defaultValue(defaultValue).build();
    }

    public static void main(String[] args) {

    }

    private ApiInfo metaData() {
        ApiInfo apiInfo = new ApiInfo("Donation App", "Donation App REST API", "1.0", "Terms of service",
                new Contact("Balasubramanin Muthuvelu", "", "balasubhramanian@gmail.com"), "Apache License Version 2.0",
                "https://www.apache.org/licenses/LICENSE-2.0");
        return apiInfo;
    }

}
