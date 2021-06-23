import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor(private http:HttpClient) { }
  addDetails(innovator){
    return this.http.post('/api/v1/solution/upload',innovator,{
    observe: 'response'});
  }
  // addfeed(id,feedback){
  //   return this.http.put(`/api/v1/solution/solved/${id}`,feedback, { responseType: 'text' });
  // }
  addfeed(id,feedback){
    return this.http.put(`/api/v1/solution/solve/${id}`,feedback);
  }
  // addfeed(id,feedback){
  //   return this.http.put('/api/v1/solution/solved/'+id,feedback);

  // }
  getinfo(id){
    return this.http.get(`/api/v1/challenge/challenge/${id}`);
  }
  getDetails(){
    return this.http.get('/api/v1/solution/getsolution');
  }
  getByid(id){
    return this.http.get(`/api/v1/solution/solve/${id}`);
  }
  
  updateDescription(id,description){
    return this.http.put(`/api/v1/solution/description/${id}`,description);
  }

  updateSolution(id, data) {
    return this.http.put(`/api/v1/solution/uploadFile/${id}`, data);
  }
  updateStatus(solutionId,solStatus){
    return this.http.put(`/api/v1/solution/status/${solutionId}?solStatus=${solStatus}`, { responseType: 'text' });
  }

  downloadFile(solutionId): any {
    return this.http.get(
      `/api/v1/solution/download/${solutionId}`,
      { responseType: 'blob' }
    );
  }
  getUpdatedHired(challengeId){
    return this.http.get(`/api/v1/challenge/update/hired/${challengeId}`);
  }

}
