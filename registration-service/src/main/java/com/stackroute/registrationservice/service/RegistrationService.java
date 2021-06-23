package com.stackroute.registrationservice.service;

import com.stackroute.registrationservice.model.User;

import java.util.List;

public interface RegistrationService {
    public User saveUser(User user);
    public List<User> getUserByEmail(String email);
}
