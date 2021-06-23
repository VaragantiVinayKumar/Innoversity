import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/Login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private logindata: LoginService, private router: Router) { }
  public login=new Login;
  public showPass:boolean=false;
  public show:number=0;
  public invalid:string;
  public loggedIn:boolean=false;
  showAlert: boolean = false;
  showbar:boolean;
  ngOnInit(): void {
  }
  addUserCredentials(form:NgForm){
    if(form.valid){
      this.logindata.addUserCredentials(this.login).subscribe((data : any)=>{
        this.showbar=true;
        console.log(data);
        this.invalid=data?.token;
        console.log(this.invalid);
        localStorage.setItem('token', data?.token);   
        localStorage.setItem('userName',data?.userName); 
        this.router.navigateByUrl("/dashboard");
      },
      (error)=> {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 1500);
      });
      }
      else{
        alert('Please fix the errors!!');
      }
    }
    public showPassword(){
      if(this.show%2==0)
          this.showPass=true;
      else
        this.showPass=false;
      this.show++;
    }

    lock() {
      console.log("here is the lock");
    }

    togglePassword() {
      this.showPass = !this.showPass;
    }
}
