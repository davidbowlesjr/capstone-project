import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AwsCatalogComponent } from "./aws-catalog.component";
import { Ec2Component } from "./ec2/ec2.component";
import { S3Component } from "./s3/s3.component";
import { LambdaComponent } from "./lambda/lambda.component";
import { RDSComponent } from "./rds/rds.component";
import { FormsModule } from "@angular/forms";
import { SesComponent } from "./ses/ses.component";
import { CloudFormationTemplateComponent } from "../cloudform-templates/cloudform-templates.component";
import { CloudwatchComponent } from "./cloudwatch/cloudwatch.component";
import { SQSComponent } from "./sqs/sqs.component";
import { SNSComponent } from "./sns/sns.component";
import { VpcComponent } from "./vpc/vpc.component";
import { DynamoComponent } from "./dynamo/dynamo.component";
import { DynamicServiceComponent } from "./dynamic-service/dynamic-service.component";

const routes : Routes = [
    {
        path : "catalog", 
        component : AwsCatalogComponent,
    },

    {
        path : "catalog/ec2",
        component : Ec2Component,
    },
    {
        path: "catalog/s3",
        component : S3Component
    },
    {
        path: "catalog/lambda",
        component: LambdaComponent
    },
    {
        path: "catalog/rds",
        component: RDSComponent
    },
    {
        path: "catalog/ses",
        component : SesComponent
    },
    {
        path: "catalog/cloudform",
        component : CloudFormationTemplateComponent
    },
    {
        path: "catalog/cloudwatch",
        component: CloudwatchComponent
    },
    {
        path: "catalog/sqs",
        component: SQSComponent
    },
    {
        path: "catalog/sns",
        component: SNSComponent
    },
    {
        path: "catalog/vpc",
        component: VpcComponent
    },
    {
        path: "catalog/dynamodb",
        component: DynamoComponent
    },
    
    
    
        
]
    
@NgModule({
    imports : [
        FormsModule,
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]
})
export class AwsCatalogRoutingModule{

}