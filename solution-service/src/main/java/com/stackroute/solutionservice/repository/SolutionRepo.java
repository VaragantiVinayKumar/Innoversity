package com.stackroute.solutionservice.repository;



import com.stackroute.solutionservice.model.Solution;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface SolutionRepo extends MongoRepository<Solution, UUID> {
    List<Solution> findBySolutionId(UUID solutionId);
}


