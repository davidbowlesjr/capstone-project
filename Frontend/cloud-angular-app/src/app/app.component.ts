import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cloud-angular-app';


  constructor(public loginService: LoginService,
    public registerService: RegisterService) {
   
  }

}
