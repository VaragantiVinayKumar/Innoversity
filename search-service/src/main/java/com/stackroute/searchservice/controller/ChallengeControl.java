package com.stackroute.searchservice.controller;

import com.stackroute.searchservice.model.Challenge;
import com.stackroute.searchservice.model.Type;
import com.stackroute.searchservice.repository.ChallengeRepository;

import edu.stanford.nlp.ling.CoreAnnotation;
import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.pipeline.CoreDocument;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

/**
 * This is the controller of the search service.
 */
@RestController
@CrossOrigin(value = "*")
@RequestMapping("/api/v1/search")
public class ChallengeControl {

    /**
     * This is the constructor of the book controller that @Autowired the
     * BookRepository
     */
    @Autowired
    private ChallengeRepository challengeRepository;
    @Autowired
    private StanfordCoreNLP stanfordCoreNLP;
    @Autowired
    private RestTemplate restTemplate;


    public ChallengeControl(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }

    /**
     * This method is used to insert the data in elastic search. The data are coming
     * from the Frontend.
     *
     * @param challenge
     * @return
     * @throws Exception
     */
    @PostMapping
    public Challenge insertChallenge(@RequestBody Challenge challenge) throws Exception {
        return challengeRepository.insertChallenge(challenge);
    }

    /**
     * This method is used to get all the books.
     *
     * @return
     */
    @GetMapping("/allchallenges")
    public Map<String, Object> getAllChallenge() {
        return challengeRepository.getAllChallenge();
    }

    /**
     * This method is used to get the book related to the id which is passing in
     * this method.
     *
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public Map<String, Object> getChallengeById(@PathVariable String id) {
        return challengeRepository.getChallengeById(id);
    }

    /**
     * This method is used to update the book related to the id which is passing in
     * this method.
     *
     * @param id
     * @return
     */
    @PutMapping("/{id}")
    public Map<String, Object> updateChallengeById(@RequestBody Challenge book, @PathVariable String id) {
        return challengeRepository.updateChallengeById(id, book);
    }

    /**
     * This method is used to delete the book related to the id which is passing in
     * this method.
     *
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    public void deleteChallengeById(@PathVariable String id) {
        challengeRepository.deleteChallengeById(id);
    }

    /**
     * This method is used to get the challenges related to keyword which is passing in
     * this method.
     *
     * @param queries
     * @return
     */
    @GetMapping("/search/{queries}")
    public List<Challenge> ChallengeSearch(@PathVariable String queries)  {
        System.out.println("\n\n\nInside Challenge Service.Ths is what we have got from challenge query :  " + queries);
        String text = "";
        System.out.println("\n\nReturnning back to challengequery service");
        return challengeRepository.findChallenge(queries);
    }


    List<String> result=new ArrayList<>();
    String url="http://localhost:8087/api/v1/search/search/";

    @GetMapping("/filter/{input}")
    public ResponseEntity<?> nlpFilter(@PathVariable final String input, @RequestParam("type") String type) {
        // String query=capitalizeWord(input);
        System.out.println("\n\n\nIn NLP Service Controller(Your inputs) : \nInput : "+input+"\nType : "+type);
        CoreDocument coreDocument = new CoreDocument(input);
        stanfordCoreNLP.annotate(coreDocument);
        List<CoreLabel> coreLabels = coreDocument.tokens();
        List<String> typeList = null;

        if (!(type == null || type.isEmpty())) {
            type = type.trim();
            typeList = Arrays.asList(type.split(","));
            result=collectList(coreLabels, typeList);
            System.out.println("\n\nFilter Result of NLP service   : "+result);

            List<Challenge> challenges= restTemplate.exchange(url+result, HttpMethod.GET, null,new ParameterizedTypeReference<List<Challenge>>(){}).getBody();

//            List<Challenge> challenges=null;
//            for(String res:result) {
//                 challenges.addAll(challengeRepository.findChallenge(res));
//            }

            if(challenges==null || challenges.isEmpty()){
                System.out.println("\n\n\nBack in Nlp,Return from Search Service(keyword method) is Null or empty");
//                return new ResponseEntity<String>("No challenges found", HttpStatus.NOT_FOUND);
                return new ResponseEntity<List<Challenge>>(challenges, HttpStatus.OK);
            }else{
                return new ResponseEntity<List<Challenge>>(challenges,HttpStatus.OK);
            }
        }
        else
        {
            String error="challenge not found";
            return new ResponseEntity<String>(error, HttpStatus.NOT_FOUND);
        }

    }

    private List<String> collectList(List<CoreLabel> coreLabels, List<String> type1) {
        List<Type> entity=new ArrayList<>();
        for(String w:type1)
        {
            entity.add(Type.valueOf(w));
        }
        List<String> keys=new ArrayList<>();
        for(Type t:entity){
            keys.addAll(coreLabels
                    .stream()
                    .filter(coreLabel -> t.getName().equalsIgnoreCase(coreLabel.get(CoreAnnotations.PartOfSpeechAnnotation.class)))
                    .map(CoreLabel::originalText)
                    .collect(Collectors.toList()));
        }
        return keys;}







}

