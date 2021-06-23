
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadchallengeService {

  constructor(private http: HttpClient) { }
  addChallenge(Challenge) {
    return this.http.post( '/api/v1/challenge/upload',Challenge, {
      observe: 'response',
    });
  }
  
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', '/api/v1/challenge/file/upload', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getChallengeById(challengeId){
   return this.http.get(`/api/v1/challenge/challenge/${challengeId}`);
  }

  downloadFile(challengeId): any {
    return this.http.get(
      `/api/v1/challenge/download/${challengeId}`,
      { responseType: 'blob' }
    );
  }
}
