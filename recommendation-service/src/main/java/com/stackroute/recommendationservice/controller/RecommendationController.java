package com.stackroute.recommendationservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.stackroute.recommendationservice.model.Domain;
import com.stackroute.recommendationservice.model.ProxyChallenge;
import com.stackroute.recommendationservice.model.User;
import com.stackroute.recommendationservice.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recommendation/")
@CrossOrigin(value = "*")
public class RecommendationController {
    @Autowired
    RecommendationService recommendationService;

    @PostMapping("/user")
    public String createUser(@RequestBody User user) {
        String saved = recommendationService.createUserNode(user);
        return saved;
    }

    @GetMapping("recommend")
    public ResponseEntity<List<ProxyChallenge>> getRecommendation(@RequestParam(value = "email") String email) {
        List<ProxyChallenge> recChallenges= recommendationService.getAllRecommendation(email);
        return new ResponseEntity<>(recChallenges, HttpStatus.OK);
    }

    @GetMapping("/getMessage")
    public String getMessageInRecommend() {
        String message = recommendationService.getMessageFromProxy();
        return message;
    }
}
