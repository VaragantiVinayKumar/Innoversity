package com.stackroute.challenge.service;

import com.stackroute.challenge.model.Challenge;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RabbitMqSender {
    public RabbitTemplate rabbitTemplate;

    /*The RabbitTemplate is injected, which accepts and forwards the messages*/
    @Autowired
    public RabbitMqSender(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @Value("${spring.rabbitmq.exchange}")
    String exchange;

    @Value("${spring.rabbitmq.routingkey}")
    String routingKey;

    /*This method sends the challenge data along with routing key to the queue.*/
    public void send(Challenge challenge) {
        System.out.println("Challenge sent:"+challenge.getChallengeTitle());
        rabbitTemplate.convertAndSend(exchange, routingKey, challenge);
    }


}
