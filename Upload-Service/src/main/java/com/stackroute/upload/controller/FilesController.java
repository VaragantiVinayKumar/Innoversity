package com.stackroute.upload.controller;
import com.stackroute.upload.model.ChallengeUpload;
import com.stackroute.upload.service.ChallengeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.UUID;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/v1")
public class FilesController {

     private ChallengeServiceImpl challengeService;

    @Autowired
    public FilesController(ChallengeServiceImpl challengeService) {
        this.challengeService=challengeService;
    }

    @PostMapping("/challenge")
    public ResponseEntity<ChallengeUpload> saveChallenge(@RequestBody ChallengeUpload challengeUpload)
    {
        UUID uuid=UUID.randomUUID();
        challengeUpload.setId(uuid);
        ChallengeUpload savedChallenge =challengeService.save(challengeUpload);
        return new ResponseEntity<>(savedChallenge, HttpStatus.CREATED);
    }


}

