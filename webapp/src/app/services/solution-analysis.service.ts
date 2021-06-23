import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolutionAnalysisService {

  constructor(private http:HttpClient) { }

  getSolution(){
    return this.http.get('/api/v1/solution/getsolution');
  }

  updateStatus(solutionId,solStatus){
    return this.http.put(`/api/v1/solution/status/${solutionId}?solStatus=${solStatus}`, { responseType: 'text' });
  }

  getSolutionByChallengeId(challengeId){
    return this.http.get(`/api/v1/solution/challenge/${challengeId}`);
  }

  updateRank(solutionId,rank){
    return this.http.put(`/api/v1/solution/rank/${solutionId}/${rank}`, { responseType: 'text' });
  }

  clearRank(){
    return this.http.put(`/api/v1/solution/rank/clear`, { responseType: 'text' });
  }
}
