package com.stackroute.authenticationservice.repository;

import com.stackroute.authenticationservice.model.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCredentialsRepository extends JpaRepository<UserCredentials,Integer> {
    UserCredentials findByEmailAndPassword(String email,String password);
}
