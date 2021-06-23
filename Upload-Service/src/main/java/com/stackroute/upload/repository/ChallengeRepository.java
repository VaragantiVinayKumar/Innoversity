package com.stackroute.upload.repository;

import com.stackroute.upload.model.ChallengeUpload;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ChallengeRepository extends MongoRepository<ChallengeUpload, UUID> {

}
