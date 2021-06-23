package com.stackroute.authenticationservice.controller;

import com.stackroute.authenticationservice.config.JWTTokenGenerator;
import com.stackroute.authenticationservice.exception.UserNotFoundException;
import com.stackroute.authenticationservice.model.UserCredentials;
import com.stackroute.authenticationservice.service.UserCredentialsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/autheticate")
public class UserCredentialsController {

    private UserCredentialsServiceImpl userCredentialsService;
    private JWTTokenGenerator jwtTokenGenerator;

    @Value("${app.controller.exception.message1}")
    private String message1;

    @Value("${app.controller.exception.message2}")
    private String message2;

    @Value("${app.controller.exception.message3}")
    private String message3;

    @Autowired
    public UserCredentialsController(UserCredentialsServiceImpl userCredentialsService, JWTTokenGenerator jwtTokenGenerator) {
        this.userCredentialsService = userCredentialsService;
        this.jwtTokenGenerator=jwtTokenGenerator;
    }

    @PostMapping("login/user")
    public ResponseEntity<?> loginUser(@RequestBody UserCredentials userCredentials){
        ResponseEntity<?> responseEntity;
        try {
            if (userCredentials.getEmail() == null || userCredentials.getPassword() == null)
                throw new UserNotFoundException(message1);
            UserCredentials userDetails = userCredentialsService.findByEmailandPassword(userCredentials.getEmail(), userCredentials.getPassword());
            if (userDetails == null) {
                throw new UserNotFoundException(message2);
            }
            if (!(userCredentials.getPassword().equals(userDetails.getPassword()))) {
                throw new UserNotFoundException(message3);
            }
            responseEntity = new ResponseEntity<>(jwtTokenGenerator.generateToken(userDetails), HttpStatus.OK);
        }catch (UserNotFoundException e){
            responseEntity = new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
        return responseEntity;
    }


    @PostMapping("login")
    public ResponseEntity<UserCredentials> saveUserCredentials(@RequestBody UserCredentials userCredentials){
        UserCredentials savedLoginDetails=userCredentialsService.saveUser(userCredentials);
        return new ResponseEntity<>(savedLoginDetails, HttpStatus.CREATED);
    }

    @GetMapping("logindata")
    public ResponseEntity<List<UserCredentials>> getAllUsers(){
        return new ResponseEntity<List<UserCredentials>>((List<UserCredentials>)userCredentialsService.getAllUsers(),HttpStatus.OK);
    }
}
