import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private service:UserprofileService, private router: Router) { }

 public user; 

 public challenge;
 public challengeIsNull:boolean=false;
 public solutionIsNull:boolean=false;
 public solution; 
 public pic;
  ngOnInit(): void {
    this.getUser();
    this.getChallenge();
    this.getSolutions();
   }

   getUser(){
    return this.service.getUserData().subscribe(data=>{
      this.user=data;
      console.log(this.user);
      this.pic = this.user[0].pic;
    })
  }

    getChallenge(){
      return this.service.getChallenge().subscribe(data=>{
        this.challenge=data;
        console.log("challenge:", this.challenge);
        if(this.challenge.length==0){
          this.challengeIsNull=true;
        }
        console.log(this.challengeIsNull);
      })
   }


   getSolutions(){
    return this.service.getUserSolution().subscribe(data=>{
      this.solution=data;
      console.log(this.solution);
      if(this.solution.length==0){
        this.solutionIsNull=true;
        console.log(this.solutionIsNull);
      }
    })
   }


   feedbackView(details) {
    console.log("solution Id:", details.solutionId);
    this.router.navigateByUrl(`feedback/${details.solutionId}`);
  }

  solutionAnalysis(challenge) {
    console.log("move to solution analysis");
    this.router.navigateByUrl(`/solutionAnalysis/${challenge.challengeId}`)
  }

}
