package com.stackroute.solutionservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "solution")
@Entity
public class Solution {

    @Id
    private UUID solutionId;
    private String solution;
//    private String attachment;
    private String solvedBy;
    private UUID challengeId;
    private String challengeTitle;
    private String description;
    private SolutionStatus solStatus;
    private String file;
    private byte[] fileByte;
    private String uploadUrl;
    private String image;
    private List<Feedback> feedback=new ArrayList<Feedback>();
    private String gitUrl;
    private Integer rank;
}
