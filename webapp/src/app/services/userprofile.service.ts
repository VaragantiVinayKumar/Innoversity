import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  constructor(private http:HttpClient) { }

  public loggedInUser;
  public email=localStorage.getItem('userName');
  getUserData(){
    console.log(this.email);
    return this.http.get(`api/v1/register/users/${this.email}`);
  }
  getChallenge(){
    return this.http.get(`/api/v1/challenge/getChallenge/${this.email}`);
  }


  getUserSolution(){
    return this.http.get(`api/v1/solution/solutions/${this.email}`)
  }


}
