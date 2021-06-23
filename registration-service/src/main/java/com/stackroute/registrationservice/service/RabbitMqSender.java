package com.stackroute.registrationservice.service;

import com.stackroute.registrationservice.model.User;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
/*This is the producer class of rabbitmq which send the user data to the consumer through queue*/

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

    @Value("${spring.rabbitmq.recommendationexchange}")
    String exchange2;

    @Value("${spring.rabbitmq.recommendationroutingkey}")
    String routingKey2;

    /*This method sends the user data along with routing key to the queue.*/
    public void send(User user) {
        System.out.println("User sent:"+user.getEmail());
        rabbitTemplate.convertAndSend(exchange, routingKey, user);
    }

    public void sendToRecommendation(User user) {
        System.out.println("User sent:"+user.getEmail());
        rabbitTemplate.convertAndSend(exchange2, routingKey2, user);
    }

}
