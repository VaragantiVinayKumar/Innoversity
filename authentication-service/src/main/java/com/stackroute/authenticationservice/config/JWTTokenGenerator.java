package com.stackroute.authenticationservice.config;

import com.stackroute.authenticationservice.model.UserCredentials;

import java.util.Map;

public interface JWTTokenGenerator {
    Map<String,String> generateToken(UserCredentials userCredentials);
}
