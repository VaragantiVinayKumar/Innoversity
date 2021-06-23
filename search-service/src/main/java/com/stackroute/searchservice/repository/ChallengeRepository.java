package com.stackroute.searchservice.repository;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.stackroute.searchservice.model.Challenge;
import org.elasticsearch.ElasticsearchException;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.SimpleQueryStringBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.*;

/**
 * This is Repository of the Search Service.
 */

@Repository
public class ChallengeRepository {

    private final String INDEX = "challengedata";
    private final String TYPE = "challenges";

    private RestHighLevelClient restHighLevelClient;

    private ObjectMapper objectMapper;

    public ChallengeRepository(ObjectMapper objectMapper, RestHighLevelClient restHighLevelClient) {
        this.objectMapper = objectMapper;
        this.restHighLevelClient = restHighLevelClient;
    }

    /**
     * This method is used to insert the data into the elastic search server.
     *
     * @param challenge This take the Challenge Object to insert the data.
     * @return
     */
    public Challenge insertChallenge(Challenge challenge) {
        challenge.setChallengeId(UUID.randomUUID().toString());
        Map<String, Object> dataMap = objectMapper.convertValue(challenge, Map.class);
//        IndexRequest indexRequest = new IndexRequest(INDEX, TYPE, challenge.getChallengeId()).source(dataMap);
        IndexRequest indexRequest = new IndexRequest(INDEX, TYPE, challenge.getChallengeId()).source(dataMap);
        try {
            IndexResponse response = restHighLevelClient.index(indexRequest);
        } catch (ElasticsearchException e) {
            e.getDetailedMessage();
        } catch (java.io.IOException ex) {
            ex.getLocalizedMessage();
        }
        return challenge;
    }

    /**
     * This method is used to get the challenge by its Id.
     *
     * @param id
     * @return
     */
    public Map<String, Object> getChallengeById(String id) {
        GetRequest getRequest = new GetRequest(INDEX, TYPE, id);
        GetResponse getResponse = null;
        try {
            getResponse = restHighLevelClient.get(getRequest);
        } catch (java.io.IOException e) {
            e.getLocalizedMessage();
        }
        Map<String, Object> sourceAsMap = getResponse.getSourceAsMap();
        return sourceAsMap;
    }

    /**
     * This method is used to get all the challenges that are stored in the elastic
     * search server.
     *
     * @return
     */
    public Map<String, Object> getAllChallenge() {
        GetRequest getRequest = new GetRequest();
        GetResponse getResponse = null;
        try {
            getResponse = restHighLevelClient.get(getRequest);
        } catch (java.io.IOException e) {
            e.getLocalizedMessage();
        }
        Map<String, Object> sourceAsMap = getResponse.getSourceAsMap();
        return sourceAsMap;
    }

    /**
     * This method is used to update the challenge by its id.
     *
     * @return
     */
    public Map<String, Object> updateChallengeById(String id, Challenge challenge) {
        UpdateRequest updateRequest = new UpdateRequest(INDEX, TYPE, id).fetchSource(true); // Fetch Object after its
        // update
        Map<String, Object> error = new HashMap<>();
        error.put("Error", "Unable to update challenge");
        try {
            String bookJson = objectMapper.writeValueAsString(challenge);
            updateRequest.doc(bookJson, XContentType.JSON);
            UpdateResponse updateResponse = restHighLevelClient.update(updateRequest);
            Map<String, Object> sourceAsMap = updateResponse.getGetResult().sourceAsMap();
            return sourceAsMap;
        } catch (JsonProcessingException e) {
            e.getMessage();
        } catch (java.io.IOException e) {
            e.getLocalizedMessage();
        }
        return error;
    }

    /**
     * This method is used to delete the challenge by its id.
     *
     * @return
     */
    public void deleteChallengeById(String id) {
        DeleteRequest deleteRequest = new DeleteRequest(INDEX, TYPE, id);
        try {
            DeleteResponse deleteResponse = restHighLevelClient.delete(deleteRequest);
        } catch (java.io.IOException e) {
            e.getLocalizedMessage();
        }
    }

    /**
     * This method is used to find the challenges by Keyword. Here whatever the keyword
     * is passing in the method it will display the challenge related to that keyword.
     *
     * @param text
     * @return
     */
    public List<Challenge> findChallenge(String text) {
        System.out.println("\n\n\nInside findChallenge() in challenge service. THis is what we have recieved : " + text);
        try {
            SearchRequest request = new SearchRequest(INDEX);
            SearchSourceBuilder scb = new SearchSourceBuilder();
            SimpleQueryStringBuilder mcb = QueryBuilders.simpleQueryStringQuery(text);
            scb.query(mcb);
            request.source(scb);

            SearchResponse response = restHighLevelClient.search(request);
            SearchHits hits = response.getHits();
            SearchHit[] searchHits = hits.getHits();
            List<Challenge> challenges = new ArrayList(searchHits.length);
            for (SearchHit hit : searchHits) {
                String sourceAsString = hit.getSourceAsString();
                if (sourceAsString != null) {
                    Gson gson = new Gson();
                    challenges.add(gson.fromJson(sourceAsString, Challenge.class));
                }
            }
            System.out.println("\n\nAt the end of findChallenge() in challengeservice : Number of challenges found - " + challenges.size());
            return challenges;
        } catch (IOException ex) {
            System.out.println("Error");
        }
        return Collections.emptyList();
    }

}

