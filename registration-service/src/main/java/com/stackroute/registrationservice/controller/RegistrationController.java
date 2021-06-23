package com.stackroute.registrationservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.registrationservice.model.User;
import com.stackroute.registrationservice.service.RabbitMqSender;
import com.stackroute.registrationservice.service.RegistrationService;
import com.stackroute.registrationservice.service.RegistrationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("/api/v1/register")
public class RegistrationController {
    RegistrationService registrationService;
    RabbitMqSender rabbitMqSender;
    @Autowired
    public RegistrationController(RegistrationService registrationService, RabbitMqSender rabbitMqSender){
        this.registrationService=registrationService;
        this.rabbitMqSender= rabbitMqSender;
    }
    @PostMapping("/registered")
    public User saveUser(@RequestBody User user){
        User userobj=null;
        UUID uuid = UUID.randomUUID();
        user.setUserId(uuid);
        userobj=registrationService.saveUser(user);
        rabbitMqSender.send(user);
        rabbitMqSender.sendToRecommendation(user);
        return userobj;
    }

    @PostMapping("/register")
    public User saveUserWithPic(@RequestParam(value = "myfile") MultipartFile myfile, @RequestParam("item") String item) throws IOException {
        User user = new ObjectMapper().readValue(item, User.class);
        UUID uuid = UUID.randomUUID();
        user.setUserId(uuid);
        System.out.println("file name:"+myfile.getOriginalFilename());
        user.setPic(myfile.getBytes());
        user.setPictureName(myfile.getOriginalFilename());
        user.setPictureType(myfile.getContentType());
        User userobj=registrationService.saveUser(user);
        rabbitMqSender.send(user);
        rabbitMqSender.sendToRecommendation(user);
        return userobj;
    }
    @GetMapping("/users/{email}")
    public List<User> getUser(@PathVariable("email") String email){
        return registrationService.getUserByEmail(email);
    }

}
