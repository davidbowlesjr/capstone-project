import { Component } from '@angular/core';
import { LoginService } from './login.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
  //styleUrls: ['./login.component.css']
})

export class LoginComponent {



  // public email : string = "";
  // public password : string = "";
  loginForm = new FormGroup({
    
    email : new FormControl("",[
      Validators.email,
      Validators.required,
    ]),
    
    password : new FormControl("",[
      Validators.required,
    ]),
    
    

  })
  
 constructor(private loginService : LoginService, private router: Router){}

 //getters
 get email(){
  return this.loginForm.get('email')
}
get password(){
  return this.loginForm.get('password')
}

  // submit(login: any){
  //   console.log("log in submit",login)
  // }
  onLoginClick() {
    console.log("your login credentials:", this.email!.value, this.password!.value);
    this.loginService
      .login(this.email!.value, this.password!.value)
    
    // this.router.navigate(['/catalog']);
  }

  

}
