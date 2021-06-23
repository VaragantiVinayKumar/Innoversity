package com.stackroute.registrationservice.repository;

import com.stackroute.registrationservice.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RegistrationRepository extends MongoRepository<User,Integer> {

}
