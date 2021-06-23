package com.stackroute.registrationservice.service;

import com.stackroute.registrationservice.model.User;
import com.stackroute.registrationservice.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrationServiceImpl implements RegistrationService{
    RegistrationRepository registrationRepository;

    @Autowired
    MongoTemplate mongoTemplate;

   @Autowired
   public RegistrationServiceImpl(RegistrationRepository registrationRepository){
       this.registrationRepository = registrationRepository;
   }

   @Override
    public User saveUser(User user){
        return registrationRepository.save(user);
    }

    @Override
    public List<User> getUserByEmail(String email) {
        Query query=new Query();
        query.addCriteria(Criteria.where("email").is(email));
        List<User> user=mongoTemplate.find(query,User.class);
        return user;
    }

}
