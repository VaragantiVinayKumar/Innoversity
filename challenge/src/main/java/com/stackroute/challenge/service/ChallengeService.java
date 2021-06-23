package com.stackroute.challenge.service;

import com.stackroute.challenge.model.Challenge;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

public interface ChallengeService {

    public Challenge save(Challenge challenge);

    public List<Challenge> getAllChallenges();

    public List<Challenge> getDomainChallenges(List<String> domain);

    Challenge getById(UUID challengeId);

    String uploadFile(MultipartFile multipartFile);


    List<Challenge> getChallengeByName(String name);

    List<Challenge> updateChallenge(UUID challengeId);

    List<Challenge> updateAttempt(UUID challengeId);

    List<Challenge> updateHired(UUID challengeId);

    
//    public String uploadFile(MultipartFile file);
}
