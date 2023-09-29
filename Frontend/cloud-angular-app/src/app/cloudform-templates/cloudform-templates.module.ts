import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudFormationTemplateComponent } from './cloudform-templates.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CloudFormRoutingModule } from './cloudform-page-router.module';



@NgModule({
  declarations: [
    CloudFormationTemplateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CloudFormRoutingModule
  ],
  exports: [
    CloudFormationTemplateComponent
  ]
})
export class CloudFormationTemplateModule { }