import { Component } from '@angular/core';
import { AwsCatalogService } from '../service/aws-catalog.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { SNSProduct, isSNSProduct } from './sns.model';
import { SNSCloudFormationService } from './cloudformation.service';

@Component({
  selector: 'app-sns',
  templateUrl: './sns.component.html'
  //styleUrls: ['./sns.component.css']
})


export class SNSComponent {
  constructor(private cfService: SNSCloudFormationService, public catalogService: AwsCatalogService) {

   }


   showSuccessMessage: boolean = false;
   showContinueButton: boolean = false;

   snsForm = new FormGroup({
    topicName : new FormControl('', [
      Validators.required,

    ]),
    
    region : new FormControl('' , [
      Validators.required,
    ]),
    protocol : new FormControl('',[
      Validators.required
    ]),
    endpoint : new FormControl('', [
      Validators.required,
    ]),
    requests : new FormControl('', [
      Validators.required
    ]),
    requestUnits : new FormControl('', [
      Validators.required
    ]),
    httpNotifications : new FormControl('', [
      Validators.required
    ]),
    httpNotificationUnits : new FormControl('', [
      Validators.required
    ]),
    emailNotifications : new FormControl('', [
      Validators.required,

    ]),
    emailNotificationUnits : new FormControl('', [
      Validators.required
    ]),
    sqsNotifications : new FormControl('', [
      Validators.required
    ]),
    sqsNotificationUnits : new FormControl('', [
      Validators.required,
    ]),
    inboundDataTransfer : new FormControl('', [
      Validators.required
    ]),
    inboundUnits : new FormControl('', [
      Validators.required
    ]),
    outboundDataTransfer : new FormControl ('', [
      Validators.required
    ]),
    outboundUnits : new FormControl('', [
      Validators.required
    ])

   })
   
   get topicName() {
    return this.snsForm.get('topicName')
   }
   get region() {
    return this.snsForm.get('region')
   }
   get protocol() {
    return this.snsForm.get('protocol')
   }
   get endpoint() {
    return this.snsForm.get('endpoint')
   }
   // Price = (# of Requests * RequestUnits - 1,000,000 free-tier requests) * 0.0000005 
   get requests() {
    return this.snsForm.get('requests')
   }
   // Million per month or per month
   get requestUnits() {
    return this.snsForm.get('requestUnits')
   }

   get httpNotifications() {
    return this.snsForm.get('httpNotifications')
   }
   get httpNotificationUnits() {
    return this.snsForm.get('httpNotificationUnits')
   }
   get emailNotifications() {
    return this.snsForm.get('emailNotifications')
   }
   get emailNotificationUnits() {
    return this.snsForm.get('emailNotificationUnits')
   }
   get sqsNotifications() {
    return this.snsForm.get('sqsNotifications')
   }
   get sqsNotificationUnits() {
    return this.snsForm.get('sqsNotificationUnits')
   }
   get inboundDataTransfer() {
    return this.snsForm.get('inboundDataTransfer')
   }
   get inboundUnits() {
    return this.snsForm.get('inboundUnits')
   }
   get outboundDataTransfer() {
    return this.snsForm.get('outboundDataTransfer')
   }
   get outboundUnits() {
    return this.snsForm.get('outboundUnits')
   }


   onSubmit(formData : any) {
    const costs = this.calculateCost(formData)
    let pricingInfo = this.cfService.generateFinanceInformation('Amazon SNS', formData)
    let SNSProduct =  this.cfService.generateCloudFormationTemplate(formData)
    this.showSuccessMessage = true;
    this.showContinueButton = true;
    let snsProduct : SNSProduct = {
      name: "SNS",
      id: 1,
      cloudFormation : SNSProduct,
      TopicName : this.topicName!.value?.toString() || "",
      Protocol : this.protocol!.value?.toString() || "",
      Endpoint: this.endpoint!.value?.toString() || "",
      
      cost : {
          region: this.region!.value?.toString() || "",
          requests: parseInt(this.requests!.value?.toString() || ""),
          requestUnits: this.requestUnits!.value?.toString() || "",
          httpNotifications: parseInt(this.httpNotifications!.value?.toString() || ""),
          httpNotificationUnits: this.httpNotificationUnits!.value?.toString() || "",
          emailNotifications: parseInt(this.emailNotifications!.value?.toString() || ""),
          emailNotificationUnits: this.emailNotificationUnits!.value?.toString() || "",
          sqsNotifications: parseInt(this.sqsNotifications!.value?.toString() || ""),
          sqsNotificationUnits: this.sqsNotificationUnits!.value?.toString() || "",
          inboundDataTransfer: parseInt(this.inboundDataTransfer!.value?.toString() || ""),
          inboundUnits: this.inboundUnits!.value?.toString() || "",
          outboundDataTransfer: parseInt(this.outboundDataTransfer!.value?.toString() || ""),
          outboundUnits: this.outboundUnits!.value?.toString() || ""
      },
      pricing: costs

  }
  //  console.log("cloudWatchProduct instance of CloudWatchProduct: ", isCloudWatchProduct(cloudwatchProduct))
  //  console.log("CloudWatchProduct instance of AWSProduct: ", isAWSProduct(cloudwatchProduct))
  //  console.log(cloudwatchProduct)
    this.cfService.generateCloudFormationTemplate(formData); 
  //  console.log(this.cloudwatchForm.value)
    this.catalogService.add(snsProduct)
    this.snsForm.reset();

   }

   calculateCost(formData: any): { upfront: number, monthly: number, annual: number } {
    // Requests
    let unitsForRequest = 0
    if (formData.requestUnits == "millionsPerMonth") {
      unitsForRequest = 1000000
    } else {
      unitsForRequest = 1
    }
       // Price = (# of Requests * RequestUnits - 1,000,000 free-tier requests) * 0.0000005 

    let requestCost = ((formData.requests * unitsForRequest) - 1000000) * 0.0000005
    if (requestCost < 0) {
      requestCost = 0
    }
    // End of Requests

    //Start of HTTP
    let unitsForHTTP = 0
    if (formData.httpNotificationUnits == "millionsPerMonth") {
      unitsForHTTP = 1000000
    } else {
      unitsForHTTP = 1
    }

    let httpCost = ((formData.httpNotifications * unitsForHTTP) - 100000) * 0.0000006000 
    if (httpCost < 0) {
      httpCost = 0;
    }

    // End of HTTP Requests


    // Start of Email/Email-JSON Notifcations

    let unitsForEmailJSON = 0
    if (formData.emailNotificationUnits == "millionsPerMonth") {
      unitsForEmailJSON = 1000000
    } else {
      unitsForEmailJSON = 1
    }
    
    let emailJSONCost = ((formData.emailNotifications * unitsForEmailJSON) - 1000) *  0.0000200000

    if (emailJSONCost < 0) {
      emailJSONCost = 0;
    }
    // End of Email/Email-JSON

    // Start of SQS
    let unitsForSQS = 0
    if (formData.sqsNotificationUnits == "millionsPerMonth") {
      unitsForEmailJSON = 1000000
    } else {
      unitsForEmailJSON = 1
    }

    let SQSCost = 0; // SQS Notifications seem to not affect Cost

    // End of SQS


    // Start of Inbound

    let unitsForInbound = 0
    if (formData.inboundUnits == "millionsPerMonth") {
      unitsForInbound = 1024
    } else {
      unitsForInbound = 1
    }
    let inboundCost = 0 // Inbound Cost Seems to be Free

    // End of Inbound



    // Start of Outbound
    let unitsForOutbound = 0
    if (formData.outboundUnits == "TB") {
      unitsForOutbound = 1024
    } else {
      unitsForOutbound = 1
    }
    
    let priceForRegion
    if (formData.region == "US_EAST_1") {
      priceForRegion = 0.01
    } else {
      priceForRegion = 0.02
    }

    let outboundCost = ((formData.outboundDataTransfer * unitsForOutbound)) * priceForRegion
    if (outboundCost < 0) {
      outboundCost = 0
    }

    // Assuming monthly for now. Adjust as needed.
    const totalMonthlyCost = requestCost + httpCost + emailJSONCost + SQSCost + inboundCost + outboundCost;
    const monthlyRounded = Math.round(totalMonthlyCost * 100) / 100
    return {
        upfront: 0, // Assuming no upfront costs
        monthly: monthlyRounded,
        annual: totalMonthlyCost * 12
    };


}

}

