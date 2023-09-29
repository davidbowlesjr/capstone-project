import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CloudFormationService } from './services/cloudFormation.service';
import { AwsCatalogService } from '../service/aws-catalog.service';
import { SQSProduct, isSQSProduct } from './models/sqs.model';
import { isAWSProduct } from '../models/aws-product.model';

@Component({
  selector: 'app-sqs',
  templateUrl: './sqs.component.html'
  //styleUrls: ['./sqs.component.css']
})
export class SQSComponent {


  constructor(private cfService: CloudFormationService, public catalogService: AwsCatalogService) {

  }
  showSuccessMessage: boolean = false;
  showContinueButton: boolean = false;

  sqsForm = new FormGroup({
    queueName: new FormControl('', [
      Validators.required
    ]),
    addDeadLetterQueue: new FormControl('', [
      Validators.required
    ]),
    standardQueueRequests: new FormControl('', [
      Validators.required, Validators.pattern("^[0-9]*$")
    ]),
    fifoQueueRequests: new FormControl('', [
      Validators.required, Validators.pattern("^[0-9]*$")
    ]),
    outboundDataTransferRegion: new FormControl('', [
      Validators.required
    ]),
    outboundDataTransferAmount: new FormControl('', [
      Validators.required, Validators.pattern("^[0-9]*$")
    ]),
    outboundDataTransferUnit: new FormControl('', [
      Validators.required
    ])
  });

  
  get queueName() {
    return this.sqsForm.get('queueName');
  }

  get addDeadLetterQueue() {
    return this.sqsForm.get('addDeadLetterQueue');
  }

  get standardQueueRequests() {
    return this.sqsForm.get('standardQueueRequests');
  }

  get fifoQueueRequests() {
    return this.sqsForm.get('fifoQueueRequests');
  }

  get outboundDataTransferRegion() {
    return this.sqsForm.get('outboundDataTransferRegion');
  }

  get outboundDataTransferAmount() {
    return this.sqsForm.get('outboundDataTransferAmount');
  }

  get outboundDataTransferUnit() {
    return this.sqsForm.get('outboundDataTransferUnit');
  }

  onSubmit(formData : any) {

    let SQSProduct =  this.cfService.generateCloudFormationTemplate(formData)

    this.showSuccessMessage = true;
    this.showContinueButton = true;
    

    const costs = this.calculateCost(formData)
    let sqsProduct : SQSProduct = {
      name : "SQS",
      id : 5,
      cloudFormation : SQSProduct,
      cost : {
        standardQueueRequests : parseInt(this.standardQueueRequests!.value?.toString() || ""),
        fifoQueueRequests : parseInt(this.fifoQueueRequests!.value?.toString() || ""),
        outboundDataTransferRegion : this.outboundDataTransferRegion!.value?.toString() || "",
        outboundDataTransferAmount : parseInt(this.outboundDataTransferAmount!.value?.toString() || ""),
        outboundDataTransferUnit : this.outboundDataTransferUnit!.value?.toString() || ""
      
    },
    pricing:costs
  }
    console.log("sqsProduct instance of SQSProduct: ", isSQSProduct(sqsProduct))
    console.log("SQSProduct instance of AWSProduct: ", isAWSProduct(sqsProduct))
    console.log(sqsProduct)
    this.cfService.generateCloudFormationTemplate(formData); 
    console.log(this.sqsForm.value)
    this.catalogService.add(sqsProduct)

   }

   calculateCost(formData: any): { upfront: number, monthly: number, annual: number } {
    let standardQueueRequests=0;
   if(formData.standardQueueRequests<=1){
     
   }
   else{
    const standardQueueRequest=(formData.standardQueueRequests-1)*1000000*.0000004;
    standardQueueRequests=standardQueueRequest;
   }
   let fifoQueueRequests=0;
   if(formData.fifoQueueRequests<=1){
    
   }
   else{
    const fifoQueueRequest=(formData.fifoQueueRequests-1)*1000000*.0000005;
    fifoQueueRequests=fifoQueueRequest;
   }
   let outboundDataTransferAmount=0;
   if(formData.outboundDataTransferUnit==='GB'){
    const outboundDataTransferAmt = formData.outboundDataTransferAmount * 0.02;
    outboundDataTransferAmount=outboundDataTransferAmt;
   }
   else{
    const outboundDataTransferAmt=formData.outboundDataTransferAmount*.02*1024;
    outboundDataTransferAmount=outboundDataTransferAmt;
   }
   // Assuming monthly for now. Adjust as needed.
   const totalMonthlyCost = standardQueueRequests+fifoQueueRequests + outboundDataTransferAmount;
 
   return {
       upfront: 0, // Assuming no upfront costs
       monthly: totalMonthlyCost,
       annual: totalMonthlyCost * 12
   };
 }
}


