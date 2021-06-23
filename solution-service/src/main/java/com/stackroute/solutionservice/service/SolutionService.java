package com.stackroute.solutionservice.service;
import com.stackroute.solutionservice.model.Feedback;
import com.stackroute.solutionservice.model.Solution;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface SolutionService {
    Solution saveDetails(Solution solution);

    List<Solution> getAllUsers();

    public void updateStatus(String solStatus, UUID solutionID);

    public List<Solution> getDetails();

//    Solution getById(UUID challengeId);

    public void updateSol(Feedback feedback, UUID solutionId);

    public List<Solution> getSolutionByChallengeId(UUID challengeId);

    public Solution getSolutionBySolutionId(UUID solutionId);

    public List<Solution> getSolutionByEmail(String email);

    public void updateSolution(String description, UUID solutionId);

    public void updateRank (UUID solutionId, Integer rank);

    public void clearRank();

    String uploadFile(MultipartFile multipartFile);

    public void updateSolutionFile(UUID solutionID, String description, MultipartFile file, String url) throws IOException;

}
