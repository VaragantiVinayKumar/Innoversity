import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge } from '../models/Challenge';
import { Search } from '../models/Search';
// import { Observable } from 'rxjs';
// import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  getContacts(email) {
    return this.http.get(`api/v1/recommendation/recommend?email=${email}`);
  }
  getChallenge() {
    return this.http.get('/api/v1/challenge/challenges');
  }

  getSearchResult(queryvalue): Observable<Search> {
    return this.http.get<Search>(`/api/v1/search/search/${queryvalue}`);
  }

  getUpdatedChallenge(challengeId){
    return this.http.get(`/api/v1/challenge/update/${challengeId}`);
  }

  getUpdatedAttempt(challengeId){
    return this.http.get(`/api/v1/challenge/update/attempt/${challengeId}`);
  }


  // getSearchResultByNLP(queryvalue):Observable<any>{
  //   return this.http.get<any>(`/api/v1/search/filter/${queryvalue}?type=NN`);
  // }
 
  getSearchResultByNLP(queryvalue):Observable<any>{
    return this.http.get<any>(`/api/v1/search/filter/${queryvalue}?type=NN`);
  }
 

}
