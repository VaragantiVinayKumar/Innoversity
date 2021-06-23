package com.stackroute.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(r->r.path("/api/v1/register/**").uri("http://localhost:8085/"))
                .route(r->r.path("/api/v1/autheticate/**").uri("http://localhost:8090/"))
                .route(r->r.path("/api/v1/challenge/**").uri("http://localhost:8095/"))
                .route(r->r.path("/api/v1/solution/**").uri("http://localhost:8900/"))
                .route(r->r.path("/api/v1/recommendation/**").uri("http://localhost:8906/"))
                .route(r->r.path("/api/v1/search/**").uri("http://localhost:8087/"))
                //mention all the routes of all the services
                .build();
    }
}