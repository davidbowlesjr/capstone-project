import { Component } from '@angular/core';
/*Import the Register service */
import { RegisterService } from './register.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
  //styleUrls: ['./register.component.css'],
 
})
export class RegisterComponent {


  registerForm = new FormGroup({
    
    email : new FormControl("",[
      Validators.email
    ]),
    firstName : new FormControl("",[
      Validators.required
    ]),
    lastName : new FormControl("",[
      Validators.required
    ]),
    orgName : new FormControl("",[
      Validators.required
    ]),
    password : new FormControl("",[
      Validators.required
    ]),
    passwordConfirm : new FormControl("",[
      Validators.required
    ])
    

  })
  
 
 constructor(
 private registerService : RegisterService,private router: Router,
 private loginService : LoginService){

  }
  //getters
  get email(){
    return this.registerForm.get('email')
  }
  get firstName(){
    return this.registerForm.get('firstName')
  }
  get lastName(){
    return this.registerForm.get('lastName')
  }
  get orgName(){
    return this.registerForm.get('orgName')
  }
  get password(){
    return this.registerForm.get('password')
  }
  get passwordConfirm(){
    return this.registerForm.get('passwordConfirm')
  }

  
  onRegisterClick() {

    if(this.password!.value !== this.passwordConfirm!.value){
      this.registerForm.invalid;
      alert("Please ensure both password fields match");
    }
   
    else{
      console.log("this is the email and name of the registered user", this.email!.value, this.firstName!.value)
      this.registerService
        .register(this.email!.value, this.firstName!.value, this.lastName!.value, this.orgName!.value, this.password!.value)
        
            console.log("User registered successfully");
 
      //this.router.navigate(['/catalog']);
      
    }
  }
}
