import { Component, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DynamicServiceService } from './service/dynamic-service.service';
import { integer } from 'aws-sdk/clients/cloudfront';
import { ActivatedRoute } from '@angular/router';
import { AwsCatalogService } from '../service/aws-catalog.service';
import { AWSProduct } from '../models/aws-product.model';

//Written By David Bowles

@Component({
  selector: 'app-dynamic-service',
  templateUrl: './dynamic-service.component.html',
  styleUrls: ['./dynamic-service.component.css']
})
export class DynamicServiceComponent {
  public bucketUrl = "https://capstone-service-image.s3.us-east-2.amazonaws.com/" 
  showSuccessMessage: boolean = false;

  constructor(public catalogService: AwsCatalogService, public service:DynamicServiceService, private route: ActivatedRoute) {}

  //TODO: Craete a Typescript Service Object Model

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.service.getServiceObject(params)
      })
  }

  serviceObjectToString(){
    return JSON.stringify(this.service.serviceObject)
  }

  onSubmit(){
    this.showSuccessMessage = true

    let cloudFormationJson = this.service.formatRescoucesWtihQuestionsToCloudTemplate()
    console.log(JSON.stringify(cloudFormationJson))

    let customProduct: AWSProduct = {
      name: this.service.serviceName,
      id: 1,
      cloudFormation: this.service.formatCloudFormationString(JSON.stringify(cloudFormationJson)),
      cost: {
        
      },
      pricing: {
        upfront: 0,
        monthly: 0,
        annual: 0
      }
    };
    this.catalogService.add(customProduct);

  }
  
}

					