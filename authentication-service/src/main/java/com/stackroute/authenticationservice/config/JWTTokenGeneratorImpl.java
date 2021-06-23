package com.stackroute.authenticationservice.config;

import com.stackroute.authenticationservice.model.UserCredentials;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JWTTokenGeneratorImpl implements JWTTokenGenerator{

    @Value("${jwt.secret}")
    private String secret;

    @Value("${app.jwttoken.message}")
    private String message;

    @Override
    public Map<String, String> generateToken(UserCredentials userCredentials) {
        String jwtToken="";
        jwtToken= Jwts.builder().setSubject(userCredentials.getEmail()).setIssuedAt(new Date()).signWith(SignatureAlgorithm.HS256,secret).compact();
        Map<String,String> jwtTokenMap=new HashMap<>();
        jwtTokenMap.put("token",jwtToken);
        jwtTokenMap.put("message",message);
        jwtTokenMap.put("userName",userCredentials.getEmail());
        return jwtTokenMap;
    }
}
