import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { UserTemplate } from './models/user-template.model';
import { AccountApiService } from './services/account-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  name: string = ""
  userTemplates?: Observable<UserTemplate[]>
  
  constructor(private loginService: LoginService,
              private accountApi: AccountApiService) {
    this.name = loginService.CurrentUser.firstName + " " + this.loginService.CurrentUser.lastName
  }
  ngOnInit(): void {
    this.userTemplates = this.accountApi.getTemplates(this.loginService.CurrentUser.id)
  }
}
