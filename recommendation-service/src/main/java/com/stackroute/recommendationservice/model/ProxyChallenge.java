package com.stackroute.recommendationservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProxyChallenge {
    @Id
    private UUID challengeId;
    private String challengerName;
    private String[] challengeDomain;
    private String challengeTitle;
    private String challengeAbstract;
    private String description;
    private Date expiryDate;
    private String rules;
    private String file;
    private byte[] fileByte;
    private String image;
    private byte[] imageByte;
    private String uploadUrl;
    private String type;
    private Date uploadedOn;
    private Integer rewardPrize;
    private Integer views;
    private Integer attempt;
}
