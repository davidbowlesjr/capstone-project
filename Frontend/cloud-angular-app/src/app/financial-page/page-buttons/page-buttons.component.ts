import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-buttons',
  templateUrl: './page-buttons.component.html',
  styleUrls: ['./page-buttons.component.css']
})
export class PageButtonsComponent {
constructor(private router:Router){}

  goToPreviousPage() {
    // Add logic to navigate to the previous page
    this.router.navigate(['app-aws-questions'])
  }

  goToNextPage() {
    // Add logic to navigate to the next page
    this.router.navigate(['app-cloudform-templates'])
  }
}
