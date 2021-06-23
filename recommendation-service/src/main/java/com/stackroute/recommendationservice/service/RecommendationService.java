package com.stackroute.recommendationservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.stackroute.recommendationservice.model.Domain;
import com.stackroute.recommendationservice.model.ProxyChallenge;
import com.stackroute.recommendationservice.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RecommendationService {

    String createUserNode(User user);

    void createDomainNode(String[] interestedDomain);

    List<ProxyChallenge> getAllRecommendation(String email);

    String getMessageFromProxy();
}
