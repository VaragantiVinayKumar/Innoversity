package com.stackroute.solutionservice.service;


import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.mongodb.client.result.UpdateResult;
import com.stackroute.solutionservice.model.Feedback;
import com.stackroute.solutionservice.model.Solution;
import com.stackroute.solutionservice.repository.SolutionRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class  SoultionServiceImpl implements SolutionService {
    @Autowired
    private SolutionRepo solutionRepo;
    private Solution solution;


    private AmazonS3 s3client;

    @Autowired
    MongoTemplate mongoTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(SoultionServiceImpl.class);

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Value("${aws.s3.endpointUrl}")
    private String endpointUrl;

    @Value("${aws.access_key_id}")
    private String accessKeyId;

    @Value("${aws.secret_access_key}")
    private String secretAccessKey;

    @Value("${aws.s3.region}")
    private String region;

    @PostConstruct
    private void initializeAmazon() {

        BasicAWSCredentials creds = new BasicAWSCredentials(accessKeyId, secretAccessKey);
        this.s3client = AmazonS3ClientBuilder
                .standard()
                .withRegion(Regions.fromName(region))
                .withCredentials(new AWSStaticCredentialsProvider(creds))
                .build();
    }

    @Override
    @Async
    public String uploadFile(MultipartFile multipartFile) {
        LOGGER.info("File upload in progress.");
        String fileUrl = "";
        try {
            final File file = convertMultiPartFileToFile(multipartFile);
            String fileName = generateFileName(multipartFile);
            fileUrl = endpointUrl + "/" + bucketName + "/" + fileName;
            uploadFileToS3Bucket(fileName, file);
            LOGGER.info("File upload is completed.");
            file.delete();    // To remove the file locally created in the project folder.
        } catch (final AmazonServiceException ex) {
            LOGGER.info("File upload is failed.");
        }
        return fileUrl;
    }



    private String generateFileName(MultipartFile multiPart) {
        return new Date().getTime() + "-" + multiPart.getOriginalFilename()
                .replace(" ", "_");
    }

    private File convertMultiPartFileToFile(final MultipartFile multipartFile) {
        LOGGER.info("converting");
        final File file = new File(multipartFile.getOriginalFilename());
        try (final FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(multipartFile.getBytes());
        } catch (final IOException ex) {
            LOGGER.error("Error converting the multi-part file to file= ");
        } catch (Exception exception) {
            LOGGER.info("Caught exception while converting");
        }
        return file;
    }


    private void uploadFileToS3Bucket(final String fileName, final File file) {
        try {
            LOGGER.info("Uploading file:" + fileName);
            final PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileName, file);
//            LOGGER.info("putObject:" + putObjectRequest);
            s3client.putObject(putObjectRequest);
            LOGGER.info("file Uploaded");
        } catch (Exception exc) {
            LOGGER.info("Exception caught:" + exc);
            LOGGER.info("Exception caught will uploading" + exc.getMessage());
        }
    }

    @Autowired
    public SoultionServiceImpl(SolutionRepo solutionRepo) {
        this.solutionRepo = solutionRepo;
    }

    @Override
    public Solution saveDetails(Solution solution) {
        return solutionRepo.save(solution);
    }

    @Override
    public List<Solution> getDetails() {
        return solutionRepo.findAll();
    }
//    @Override
//    public Solution getById(UUID solutionId) {
//        List<Solution> solution = solutionRepo.findBySolutionId(solutionId);
//        System.out.println(solution);
//        return solution.get(0);
//    }

//    @Override
//    public Solution getById(UUID solutionId) {
//        List<Solution> solution = solutionRepo.findBySolutionId(solutionId);
//        System.out.println(solution);
//        return solution.get(0);
//    }

    @Override
    public void updateSol(Feedback feedback, UUID solutionId) {
        List<Solution> solution = solutionRepo.findBySolutionId(solutionId);
        System.out.println("solution extracted:"+solution);
        Query query = new Query(Criteria.where("solutionId").is(solutionId));
        Update updateQuery = new Update();
        List<Feedback> existingFeed = solution.get(0).getFeedback();
        if (existingFeed == null) {
            List<Feedback> feedbackList = new ArrayList<>();
            feedbackList.add(feedback);
            updateQuery.set("feedback", feedbackList);
        } else {
            existingFeed.add(feedback);
            updateQuery.set("feedback", existingFeed);
        }
        UpdateResult result = mongoTemplate.upsert(query, updateQuery, "solution");
    }

    @Override
    public List<Solution> getSolutionByChallengeId(UUID challengeId) {
        Query query=new Query();
        query.addCriteria(Criteria.where("challengeId").is(challengeId));
        List<Solution> solution=mongoTemplate.find(query,Solution.class);
        return solution;
    }

    @Override
    public Solution getSolutionBySolutionId(UUID solutionId) {
        List<Solution> solutionList = solutionRepo.findBySolutionId(solutionId);
        return solutionList.get(0);
    }

    public List<Solution> getAllUsers() {
        return (List<Solution>) solutionRepo.findAll();
    }


    @Override
    public void updateStatus(String solStatus, UUID solutionId) {
        System.out.println(getDetails());
        Query query = new Query(Criteria.where("solutionId").is(solutionId));
        Update updateQuery = new Update();
        updateQuery.set("solStatus",solStatus);
        mongoTemplate.upsert(query,updateQuery,"solution");
    }


    @Override
    public List<Solution> getSolutionByEmail(String email) {
        Query query=new Query();
        query.addCriteria(Criteria.where("solvedBy").is(email));
        List<Solution> sol=mongoTemplate.find(query,Solution.class);
        return sol;
    }
    @Override
    public void updateSolution(String description, UUID solutionId) {
        Query query = new Query(Criteria.where("solutionId").is(solutionId));
        Update updateQuery = new Update();
        updateQuery.set("description",description);
        mongoTemplate.upsert(query,updateQuery,"solution");
    }

    @Override
    public void updateRank (UUID solutionId, Integer rank) {
        Query query = new Query(Criteria.where("solutionId").is(solutionId));
        Update updateQuery = new Update();
        updateQuery.set("rank",rank);
        mongoTemplate.upsert(query,updateQuery,"solution");
    }

    public void clearRank () {
        Query query = new Query(Criteria.where("solStatus").is("Hired"));
        Update updateQuery = new Update();
        updateQuery.set("rank",0);
        mongoTemplate.updateMulti(query,updateQuery,"solution");
    }

    @Override
    public void updateSolutionFile(UUID solutionID, String description, MultipartFile file, String url) throws IOException {
        Query query = new Query(Criteria.where("solutionId").is(solutionID));
        Update updateQuery = new Update();
        updateQuery.set("description",description);
        updateQuery.set("file",file.getOriginalFilename());
        updateQuery.set("fileByte",file.getBytes());
        updateQuery.set("uploadUrl",url);
        mongoTemplate.upsert(query,updateQuery,"solution");
    }

}
