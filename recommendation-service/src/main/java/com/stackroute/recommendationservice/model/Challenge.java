package com.stackroute.recommendationservice.model;

import lombok.*;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;

import java.util.UUID;

@NodeEntity
@NoArgsConstructor
@AllArgsConstructor
@Data
@RequiredArgsConstructor
public class Challenge {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private UUID challengeId;
    @NonNull
    private String challengerName;
    private String[] challengeDomain;

}
