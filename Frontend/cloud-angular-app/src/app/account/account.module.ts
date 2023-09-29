import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { S3BucketLinkPipe } from './pipes/template-link.pipe';
import { PriceTransformPipe } from './pipes/template-price.pipe';


@NgModule({
  declarations: [
    AccountComponent,
    S3BucketLinkPipe,
    PriceTransformPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AccountComponent
  ]
})
export class AccountModule { }
