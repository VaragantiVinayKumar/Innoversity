import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  constructor(private http :HttpClient) { }

   registerUser(data : FormData):Observable<any>{
    return this.http.post<any>('api/v1/register/register',data);
  }

}
