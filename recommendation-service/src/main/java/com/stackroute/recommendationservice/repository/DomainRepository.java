package com.stackroute.recommendationservice.repository;

import com.stackroute.recommendationservice.model.Domain;
import com.stackroute.recommendationservice.model.User;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DomainRepository extends Neo4jRepository<Domain, Long> {

    @Query("Merge(d:Domain {domain:$domain}) Return d")
    Domain createDomainNode(String domain);

    @Query("MATCH(d:Domain {domain:$domain}) RETURN d")
    List<Domain> findDomainByName(String domain);
}
