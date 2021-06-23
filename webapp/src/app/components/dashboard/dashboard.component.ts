import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service: DashboardService, private router: Router) { }
  public loggedInUser: String;
  public recommended: Array<string> = [];
  public searchedChallenge: Array<string> = [];
  public recomChallenge;
  public challengerName;
  public recomChallenger;
  public health: Array<any> = [];
  public engineering: Array<string> = [];
  public electricity: Array<string> = [];
  public science: Array<string> = [];
  public aerospace: Array<string> = [];
  public habitat: Array<string> = [];
  public environment: Array<string> = [];
  public temp: Array<string> = [];

  public healthIsNull: boolean = true;
  public engineeringIsNull: boolean = true;
  public aerospaceIsNull: boolean = true;
  public habitatIsNull: boolean = true;
  public environmentIsNull: boolean = true;
  public electricityIsNull: boolean = true;
  public searchIsNull: boolean = false;
  public notSearched: boolean = false;
  public scienceIsNull: boolean = true;
  public recomIsNull: boolean = false;
  public challengeIsNull: boolean = false;
  public challenge;
  public email;
  public count;
  public searchresult;

  public date: Date = new Date;
  public date1: Date;
  public date2: Date;
  setQuery(querytext) {
    this.count = querytext.split(' ').length;
    if (this.count == 1) {
      this.service.getSearchResult(querytext).subscribe(data => {
        this.searchresult = data;
        this.notSearched = true;
        console.log(this.searchresult);
        if (this.searchresult.length == 0) {
          this.searchIsNull = true;
        } else {
          this.searchresult.forEach(ele => {
            console.log("search domain:", ele.challengeDomain[0]);
            const randomNum = Math.floor((Math.random() * 5) + 1);
            ele.imageUrl='assets/'+ele.challengeDomain[0]+'/'+randomNum+'.jpg';
            this.searchedChallenge.push(ele);
          });
        }
      });
    }
    else {
      this.service.getSearchResultByNLP(querytext).subscribe(data => {
        this.searchresult = data;
        console.log(this.searchresult);
        this.notSearched = true;
        console.log(this.searchresult);
        if (this.searchresult.length == 0) {
          this.searchIsNull = true;
        } else {
          this.searchresult.forEach(ele => {
            console.log("search domain:", ele.challengeDomain[0]);
            const randomNum = Math.floor((Math.random() * 5) + 1);
            ele.imageUrl='assets/'+ele.challengeDomain[0]+'/'+randomNum+'.jpg';
            this.searchedChallenge.push(ele);
          });
        }
      });
    }
  }

  ngOnInit(): void {
    this.getContacts();
    this.getChallenge();
    this.loggedInUser = localStorage.getItem("userName");
    console.log(this.date);
  }
  getContacts() {
    this.email = this.loggedInUser;
    this.service.getContacts(this.email).subscribe(data => {
      this.recomChallenge = data;
      this.recomChallenge.map(m => {
        this.date2 = new Date(m.expiryDate);
        if (this.date2.getTime() > this.date.getTime()) {
          this.recomChallenger = m.challengerName;
          console.log(this.recomChallenge);
          if (this.recomChallenger != this.loggedInUser) {
            const randomNum = Math.floor((Math.random() * 5) + 1);
            m.imageUrl='assets/'+m.challengeDomain[0]+'/'+randomNum+'.jpg';
            this.recommended.push(m);
          }
          if (this.recommended.length != 0) {
            this.recomIsNull = true;
            console.log(this.recomIsNull);
          }
        }
        });

    });
  }

  getChallenge() {
    this.service.getChallenge().subscribe(data => {
      this.challenge = data;
      console.log(this.challenge);
      console.log(this.loggedInUser);
      this.challenge.map(d => {
        this.challengerName = d.challengerName;
        this.date1 = new Date(d.expiryDate);
        console.log(this.date1.getTime() > this.date.getTime());
        console.log(this.challengerName);
        if (this.date1.getTime() > this.date.getTime()) {
          if (this.challengerName != this.loggedInUser) {
            d.challengeDomain.map(m => {
              if (m == "Health") {
                const randomNum = Math.floor((Math.random() * 5) + 1);
                d.imageUrl='assets/Health/'+randomNum+'.jpg';
                this.health.push(d);
              }
              if (m == "Engineering") {
                const randomNum = Math.floor((Math.random() * 5) + 1);
                d.imageUrl='assets/Engineering/'+randomNum+'.jpg';
                this.engineering.push(d);
              }
              if (m == "Science") {
                const randomNum = Math.floor((Math.random() * 5) + 1);
                d.imageUrl='assets/Science/'+randomNum+'.jpg';
                this.science.push(d);
              }
              if (m == "Electricity") {
                const randomNum = Math.floor((Math.random() * 5) + 1);
                d.imageUrl='assets/Electricity/'+randomNum+'.jpg';
                this.electricity.push(d);
              }
              if (m == "Aerospace") {
                const randomNum = Math.floor((Math.random() * 5) + 1);
                d.imageUrl='assets/Aerospace/'+randomNum+'.jpg';
                this.aerospace.push(d);
              }
              if (m == "Habitat") {
                const randomNum = Math.floor((Math.random() * 5) + 1);
                d.imageUrl='assets/Habitat/'+randomNum+'.jpg';
                this.habitat.push(d);
              }
              if (m == "Environment") {
                const randomNum = Math.floor((Math.random() * 5) + 1);
                d.imageUrl='assets/Environment/'+randomNum+'.jpg';
                this.environment.push(d);
              }

            });
          }
        }
      });

      if (this.health.length == 0) {
        this.healthIsNull = false;
      }
      if (this.engineering.length == 0) {
        this.engineeringIsNull = false;
      }
      if (this.science.length == 0) {
        this.scienceIsNull = false;
      }

      if (this.electricity.length == 0) {
        this.electricityIsNull = false;
      }

      if (this.aerospace.length == 0) {
        this.aerospaceIsNull = false;
      }

      if (this.habitat.length == 0) {
        this.habitatIsNull = false;
      }

      if (this.environment.length == 0) {
        this.environmentIsNull = false;
      }
      if (!(this.healthIsNull) && !(this.engineeringIsNull) && !(this.scienceIsNull) && !(this.electricityIsNull) && !(this.aerospaceIsNull) && !(this.habitatIsNull) && !(this.environmentIsNull)) {
        this.challengeIsNull = true;
      }
    });
  }
  getChallengeById(challengeId) {
    console.log("User clicked on:", challengeId.challengeId);
    this.service.getUpdatedChallenge(challengeId.challengeId).subscribe(data => {
      console.log(data);
    })
    this.router.navigateByUrl(`/challengeDes/${challengeId.challengeId}`);
  }

  getHealthImage() {
    const randomNum = Math.floor((Math.random() * 5) + 1);
    console.log("Health domain:", randomNum);
    return 'assets/Health/'+randomNum+'.jpg';
  }
}