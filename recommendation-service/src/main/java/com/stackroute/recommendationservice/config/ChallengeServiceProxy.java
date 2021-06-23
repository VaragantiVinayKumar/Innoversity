package com.stackroute.recommendationservice.config;

import com.stackroute.recommendationservice.model.ProxyChallenge;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(url = "http://localhost:8095", name="challenge-service")
public interface ChallengeServiceProxy {

    @GetMapping("/api/v1/getMessage")
    String getMessage();

    @GetMapping("/api/v1/challenge/challenges")
    public ResponseEntity<List<ProxyChallenge>> getChallenges(@RequestParam(name = "domain", required = false) List<String> domain);
    }
