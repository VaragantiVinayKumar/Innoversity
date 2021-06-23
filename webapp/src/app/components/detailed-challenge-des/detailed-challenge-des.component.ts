import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadchallengeService } from 'src/app/services/uploadchallenge.service';

@Component({
  selector: 'app-detailed-challenge-des',
  templateUrl: './detailed-challenge-des.component.html',
  styleUrls: ['./detailed-challenge-des.component.css']
})
export class DetailedChallengeDesComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute,
    private router: Router, private service :UploadchallengeService) { }

  public challengeId;
  public challenge;
  public des;
  public fileName;
  ngOnInit(): void {
    this.challengeId = this.activateRoute.snapshot.params.challengeId;
    this.getChallengeByChallengeId(this.challengeId);
  }
  getChallengeByChallengeId(challengeId){
    this.service.getChallengeById(this.challengeId).subscribe(data=>{
      this.challenge=data;
      // this.des.setValue(this.challenge.description);
      // console.log(this.des);
      this.fileName=this.challenge.file;
      console.log("solution details:", this.challenge);
    });
  }
  openFile() {
    console.log("open file here");
    window.open(this.challenge.uploadUrl, "_blank");
  }
  solution() {
    console.log("User clicked on:",this.challenge.challengeId);
      console.log("move to upload solution");
      this.router.navigateByUrl(`/solution/${this.challenge.challengeId}`);
  }

  downloadDocument() {
    console.log("challengeId:"+this.challengeId);
    this.service.downloadFile(this.challengeId).subscribe((response) => {
      let blob: any = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', url);
      link.setAttribute('download', this.fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }),
      (error) => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }
}
