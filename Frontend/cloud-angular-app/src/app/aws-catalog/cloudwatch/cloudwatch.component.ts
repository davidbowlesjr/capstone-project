import { Component } from '@angular/core';
import { AwsCatalogService } from '../service/aws-catalog.service';
import { isAWSProduct } from '../models/aws-product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CloudWatchProduct, isCloudWatchProduct } from './cloudwatch.model';
import { CloudWatchCloudFormationService } from './cloudformation.service';


@Component({
  selector: 'app-cloudwatch',
  templateUrl: './cloudwatch.component.html',
  styleUrls: ['./cloudwatch.component.css']
})
export class CloudwatchComponent {
  constructor(private cfService: CloudWatchCloudFormationService, public catalogService: AwsCatalogService) {

   }
   showSuccessMessage: boolean = false;

   cloudwatchForm = new FormGroup({
    alarmName : new FormControl('', [
      Validators.required,

    ]),
    
    region : new FormControl('' , [
      Validators.required,
    ]),
    comparisonOperator : new FormControl('',[
      Validators.required
    ]),
    numberOfBreaches : new FormControl('', [
      Validators.required,

    ]),
    numberOfMetrics : new FormControl('', [
      Validators.required
    ]),
    standardResolution : new FormControl('', [
      Validators.required
    ]),
    highResolution : new FormControl('', [
      Validators.required
    ]),
    compositeAlarms : new FormControl('', [
      Validators.required
    ]),
    evaluationPeriod : new FormControl('', [
      Validators.required,

    ]),
    threshold : new FormControl('', [
      Validators.required
    ]),
    alarmAction : new FormControl('', [
      Validators.required
    ]),

   })
   
   get alarmName() {
    return this.cloudwatchForm.get('alarmName')
   }
   get comparisonOperator() {
    return this.cloudwatchForm.get('comparisonOperator')
   }
   get numberOfBreaches() {
    return this.cloudwatchForm.get('numberOfBreaches')
   }
   // Cost = # of Metrics * $0.30
   get numberOfMetrics() {
    return this.cloudwatchForm.get('numberOfMetrics')
   }
   // Cost = # of Standard Resolution Alarms * $0.10
   get standardResolution() {
    return this.cloudwatchForm.get('standardResolution')
   }

   // Cost = # of High Resolution Alarms * $0.30
   get highResolution() {
    return this.cloudwatchForm.get('highResolution')
   }

   // Cost = # of Composite Alarms * $0.50
   get compositeAlarms() {
    return this.cloudwatchForm.get('compositeAlarms')
   }
   get evaluationPeriod() {
    return this.cloudwatchForm.get('evaluationPeriod')
   }
   get threshold() {
    return this.cloudwatchForm.get('threshold')
   }
   get alarmAction() {
    return this.cloudwatchForm.get('alarmAction')
   }


   onSubmit(formData : any) {
    let cloudWatchProduct =  this.cfService.generateCloudFormationTemplate(formData)
    this.showSuccessMessage = true;
    const costs = this.calculateCost(formData)
    let cloudwatchProduct : CloudWatchProduct = {
      name : "Cloud Watch Alarm",
      id : 1,
      cloudFormation : cloudWatchProduct,
      cost : {
        comparisonOperator : this.comparisonOperator!.value?.toString() || "",
        numberOfBreaches : parseInt(this.numberOfBreaches!.value?.toString() || ""),
        evaluationPeriod : parseInt(this.evaluationPeriod!.value?.toString() || ""),
        threshold : parseInt(this.threshold!.value?.toString() || ""),
        alarmAction : this.alarmAction!.value?.toString() || ""
      
      },
      pricing: costs
    }
  //  console.log("cloudWatchProduct instance of CloudWatchProduct: ", isCloudWatchProduct(cloudwatchProduct))
  //  console.log("CloudWatchProduct instance of AWSProduct: ", isAWSProduct(cloudwatchProduct))
  //  console.log(cloudwatchProduct)
    this.cfService.generateCloudFormationTemplate(formData); 
  //  console.log(this.cloudwatchForm.value)
    this.catalogService.add(cloudwatchProduct)
    this.cloudwatchForm.reset();

   }

   
   calculateCost(formData: any): { upfront: number, monthly: number, annual: number } {
    const metricsCost = formData.numberOfMetrics * 0.30;
    const standardResolutionCost = formData.standardResolution * 0.10;
    const highResolutionCost = formData.highResolution * 0.30;
    const compositeAlarmsCost = formData.compositeAlarms * 0.50;

    // Assuming monthly for now. Adjust as needed.
    const totalMonthlyCost = metricsCost + standardResolutionCost + highResolutionCost + compositeAlarmsCost;
    const monthlyRounded = Math.round(totalMonthlyCost * 100) / 100
    return {
        upfront: 0, // Assuming no upfront costs
        monthly: monthlyRounded,
        annual: totalMonthlyCost * 12
    };
}

}

