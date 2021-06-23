import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  addUserCredentials(login){
    return this.http.post(`/api/v1/autheticate/login/user`,login);
  } 
}
