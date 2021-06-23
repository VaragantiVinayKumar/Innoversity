package com.stackroute.searchservice.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class Challenge {
    private String challengeId;
    private String challengeTitle;
    private String challengerName;
    private String[] challengeDomain;
    private String description;
    private Date expiryDate;

}
