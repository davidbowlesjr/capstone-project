import { Component } from '@angular/core';
import { UniversalHeaderService } from './universal-header.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-universal-header',
  templateUrl: './universal-header.component.html'
  //styleUrls: ['./universal-header.component.css']
})
export class UniversalHeaderComponent {
  loggedIn: boolean = false;
  loginSubject$: BehaviorSubject<boolean>;

  constructor(private headerService: UniversalHeaderService) {
    this.loginSubject$ = this.headerService.getLoggedInStatus();

    this.loginSubject$.subscribe(value => {
      this.loggedIn = value
    })
  }



}
