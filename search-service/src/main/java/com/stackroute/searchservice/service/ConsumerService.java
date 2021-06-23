package com.stackroute.searchservice.service;


import com.stackroute.searchservice.model.Challenge;
import com.stackroute.searchservice.repository.ChallengeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.annotation.RabbitListenerConfigurer;
import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistrar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConsumerService implements RabbitListenerConfigurer {

    private static Logger logger = LoggerFactory.getLogger(ConsumerService.class);

    private ChallengeRepository challengeRepository;

    @Autowired
    public ConsumerService(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }

    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public void receivedMessage(Challenge challenge) {

        logger.info("Challenge received is: " + challenge);
        challengeRepository.insertChallenge(challenge);
    }

    @Override
    public void configureRabbitListeners(RabbitListenerEndpointRegistrar rabbitListenerEndpointRegistrar) {

    }
}
