import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FeedbackComponent } from '../components/feedback/feedback.component';

import { InnovatorProperties } from '../models/InnovatorProperties';
import { DashboardService } from '../services/dashboard.service';
import { SolutionService } from '../services/solution.service';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css'],
})
export class SolutionComponent implements OnInit {
  public innovator = new InnovatorProperties();
  public challenge = 'Smart Helmet';
  public isEdit: any;
  public info;
  public challengeName;
  selectedFile: File;
// public challengeInfo=[];
  public loggedInUser;
  public challengeId;
  public uploadSuccess=false;
 
  // logg = 'Hi Arshad';
  constructor(
    private service: SolutionService,
    private service1:DashboardService,
    private feedservice: FeedbackComponent,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}
  // setLog() {
  //   this.feedservice.getLog(this.logg);
  // }
  ngOnInit(): void {
    this.challengeId = this.activateRoute.snapshot.params.challengeId;
    // console.log("challenge Id:", this.challengeId);
    this.getinfo();
    // this.setLog();
  }

  

  showbar:boolean=false;
  onsubmit(form: NgForm) {
    if (form) {
      this.loggedInUser = localStorage.getItem('userName');
      console.log('Solved by:', this.loggedInUser);
      form.value.solvedBy = this.loggedInUser;
      form.value.challengeId = this.challengeId;
      form.value.challengeTitle = this.info.challengeTitle;
      const item = form.value;
      const uploadFileData = new FormData();
      console.log("file:", this.selectedFile);
      uploadFileData.append('item', JSON.stringify(item));
      uploadFileData.append('file', this.selectedFile);
      if(form.valid)
    {
      this.showbar=true;
      this.service.addDetails(uploadFileData).subscribe(data => {
        console.log(form.value);
        this.uploadSuccess= true;
        this.service1.getUpdatedAttempt(this.challengeId).subscribe(data=>{
          console.log(data);
        })
        // this.showbar=true;
        this.router.navigateByUrl("/dashboard");
    });
    }
      else{
        console.log("form is invalid");
      }
      
    //   this.service.addDetails(uploadFileData).subscribe((data) => {
    //   this.isEdit = 'Data Stored Successfully';
      
    //   this.router.navigateByUrl("/dashboard");
    //   });
    // } else {
    //   this.isEdit = 'Please Enter Correct Details!!';
    // }
    }
  }
  next(){
    this.router.navigateByUrl(`/challengeDes/${this.challengeId}`);
  }
  getinfo(){
    this.service.getinfo(this.challengeId).subscribe((data) => {
      // debugger;
      // let list = [];
      this.info = data;
      console.log("challenge Info:", this.info);
      // console.log("Data is"+data);
      // console.log("tHE CHALLENGE DETAILS"+this.info);/
      // list = this.info;
      // list.forEach((a) => {
        // this.challengeName = a.challengeTitle;
    // });
    });
  }

  public onFileChanged(event) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  
}
