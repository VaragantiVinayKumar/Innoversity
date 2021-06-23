import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultMaxListeners } from 'events';
import { SolutionAnalysisService } from 'src/app/services/solution-analysis.service';

@Component({
  selector: 'app-solution-analysis',
  templateUrl: './solution-analysis.component.html',
  styleUrls: ['./solution-analysis.component.css']
})
export class SolutionAnalysisComponent implements OnInit {

  constructor(private service : SolutionAnalysisService, private activateRoute: ActivatedRoute,
              private router: Router) { }

  public solutionDetails;
  public challengeId;
  public challengeTitle;
  public solutionDetailsBychallenge;
  ranks = [1, 2, 3];
  ranksDisabling: Array<any>;
  reservedRanks: Array<number>;
  rankedSeleted;
  
  ngOnInit(): void {
    this.challengeId = this.activateRoute.snapshot.params.challengeId;
    console.log("challenge Id:", this.challengeId);
    // this.getSolution();
    this.getSolutionByChallengeId(this.challengeId);
  }

  getSolution(){
    this.service.getSolution().subscribe(data=>{
      console.log(data);
      this.solutionDetails=data;
    });
  }

  getSolutionByChallengeId(challengeId){
    this.service.getSolutionByChallengeId(this.challengeId).subscribe(data=>{
      this.solutionDetailsBychallenge=data;
      console.log("solution details:", this.solutionDetailsBychallenge);
      this.reservedRanks = [];
      this.solutionDetailsBychallenge.forEach(solution => {
        if (solution.rank > 0) {
          this.reservedRanks.push(solution.rank);
        }
      });
      console.log("reserved ranks:", this.reservedRanks);
      this.disableRanks();
    });
  }

  disableRanks() {
    this.ranksDisabling = [];
    for (let count=1; count<=3; count++) {
      if (this.reservedRanks.indexOf(count) !== -1) {
        const disabledRank= {'rank': count, 'disabled': true};
        this.ranksDisabling.push(disabledRank);
      } else {
        const enabledRank = {'rank': count, 'disabled': false};
        this.ranksDisabling.push(enabledRank);
      }
    }
    console.log("rank array:", this.ranksDisabling);
  }

  // updateStatus(details){
  //   this.service.updateStatus(details.solutionId,{
  //       solStatus:details.solStatus?"Accepted":"Rejected",
  //     }).subscribe(data=>{
  //       this.getSolution();
  //       console.log(data);
  //     })
  //   }

    solAccepted(details, value) {
        const status = value?"Accepted":"Rejected";
        this.service.updateStatus(details.solutionId, status).subscribe(data => {this.getSolutionByChallengeId(this.challengeId)});
    }

    feedbackView(details) {
      console.log("solution Id:", details.solutionId);
      this.router.navigateByUrl(`feedback/${details.solutionId}`);
    }

    changeRank(e, id) {
      console.log("rank changed:", e);
      console.log("ID:", id);
      this.service.updateRank(id, e).subscribe((data) => {
        console.log("data:"+data);
        this.getSolutionByChallengeId(this.challengeId);
      });
    }

    clearRankings() {
      console.log("clear all rankings");
      this.service.clearRank().subscribe((data) => {
        console.log("data:"+data);
        this.getSolutionByChallengeId(this.challengeId);
      });
    }

    // feedbackView1(details) {
    //   const color=true;
    //   console.log("solution Id:", details.solutionId);
    //   this.router.navigateByUrl(`feedback/${details.solutionId}`);
    // }
  }
