import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwsCatalogComponent } from './aws-catalog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AwsCatalogRoutingModule } from './aws-catalog.router';
import { Ec2Component } from './ec2/ec2.component';
import { Ec2RoutingModule } from './ec2/ec2.router';
import { S3Component } from './s3/s3.component';
import { S3RoutingModule } from './s3/s3.router';
import { SesComponent } from './ses/ses.component';
import { SesRoutingModule } from './ses/ses.router';
import { LambdaComponent } from './lambda/lambda.component';
import { LambdaRoutingModule } from './lambda/lambda.router';
import { RDSComponent } from './rds/rds.component';
import { RDSRoutingModule } from './rds/rds.router';
import { CloudwatchComponent } from './cloudwatch/cloudwatch.component';
import { CloudwatchRoutingModule } from './cloudwatch/cloudwatch.router';
import { SQSRoutingModule } from './sqs/sqs.router';
import { SQSComponent } from './sqs/sqs.component';
import { SNSComponent } from './sns/sns.component';
import { SNSRoutingModule } from './sns/sns.router';
import { VpcComponent } from './vpc/vpc.component';

import { CreateServiceComponent } from './create-service/create-service.component';
import { CreateServiceRoutingModule } from './create-service/create-service.router';

import { DynamoComponent } from './dynamo/dynamo.component';
import { DynamoRoutingModule } from './dynamo/dynamo.router';
//material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import { CreateOneServiceComponent } from './create-service/create-one-service/create-one-service.component';
import { NgOptimizedImage } from '@angular/common'
import { DynamicServiceComponent } from './dynamic-service/dynamic-service.component';
import { DynamicServiceRoutingModule } from './dynamic-service/dynamic-service.router';
import { VpcRoutingModule } from './vpc/rds.router';
import { CreateOptionsComponent } from './create-service/create-service-options/create-options.component';

@NgModule({
  declarations: [
    AwsCatalogComponent,
    Ec2Component,
    S3Component,
    LambdaComponent,
    RDSComponent,
    SesComponent,
    CloudwatchComponent,
    SQSComponent,
    SNSComponent,
    VpcComponent,
    CreateServiceComponent,
    CreateOneServiceComponent,
    DynamoComponent,
    DynamicServiceComponent,
    CreateOptionsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AwsCatalogRoutingModule,
    Ec2RoutingModule,
    S3RoutingModule,
    LambdaRoutingModule,
    RDSRoutingModule,
    FormsModule,
    SesRoutingModule,
    CloudwatchRoutingModule,
    SQSRoutingModule,
    SNSRoutingModule,
    VpcRoutingModule,
    CreateServiceRoutingModule,
    DynamoRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatRadioModule,
    NgOptimizedImage,
    DynamicServiceRoutingModule
  ],
  exports: [
    AwsCatalogComponent
  ]
})
export class AwsCatalogModule { }
