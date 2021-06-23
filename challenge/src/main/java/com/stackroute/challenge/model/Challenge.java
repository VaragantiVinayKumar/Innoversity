package com.stackroute.challenge.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "challenge")

public class Challenge {
    @Indexed(unique = true)
    private UUID challengeId;
    private String challengerName;
    private String[] challengeDomain;
    private String challengeTitle;
    private String challengeAbstract; //I make capital (Abstract) due to abstract keyword predefined in java
    private String description;
    private Date expiryDate;
    private String rules;
    private String file;
    private byte[] fileByte;
    private String uploadUrl;
    private String type;
    private Date uploadedOn;
    private Integer rewardPrize;
    private Integer views;
    private Integer attempt;
    private Integer hired;
    private byte[] qrCode;
//    LocalDate localDate = LocalDate.now(); // used in java 8
//    Date date =new Date();

}
