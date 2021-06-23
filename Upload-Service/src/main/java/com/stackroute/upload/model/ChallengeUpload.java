package com.stackroute.upload.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "challenge")
public class ChallengeUpload {
   @Id
    private UUID id;
    private String Challengername;
    private String Challengedomain;
    private String ChallengeTitle;
    private String Abstract;
    private String Description;
    private String Rules;
}
