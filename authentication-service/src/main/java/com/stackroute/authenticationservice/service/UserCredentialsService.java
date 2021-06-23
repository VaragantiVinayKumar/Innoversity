package com.stackroute.authenticationservice.service;

import com.stackroute.authenticationservice.exception.UserNotFoundException;
import com.stackroute.authenticationservice.model.UserCredentials;

import java.util.List;


public interface UserCredentialsService {
    UserCredentials findByEmailandPassword(String email, String password) throws UserNotFoundException;

    UserCredentials saveUser(UserCredentials userCredentials);

    List<UserCredentials> getAllUsers();
}
