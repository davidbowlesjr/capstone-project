import { Component } from '@angular/core';
import { CloudFormationService } from './cloudformation.service'; // Import the service
import { AwsCatalogService } from '../service/aws-catalog.service';
import { LambdaProduct } from './lambda.model';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-lambda',
  templateUrl: './lambda.component.html',
  styleUrls: ['./lambda.component.css']
})
export class LambdaComponent {
  roles = ['arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole']
  runtimes = ['dotnet6','dotnetcore1.0', 'dotnetcore2.0', 'dotnetcore2.1','dotnetcore3.1','go1.x', 'java11','java17','java8', 'java8.al2','nodejs','nodejs10.x','nodejs12.x','nodejs14.x','nodejs16.x',
  'nodejs18.x','nodejs4.3','nodejs4.3-edge','nodejs6.10','nodejs8.10','provided','provided.al2','python2.7','python3.10', 'python3.11','python3.6','python3.7','python3.8', 'python3.9','ruby2.5', 'ruby2.7','ruby3.2'];
  regions = ['US_EAST_1', 'US_WEST_1']; 
  architectures = ['x86', 'arm'];
  requestUnits = ['PER_MONTH', 'PER_HOUR', 'PER_DAY', 'PER_MINUTE', 'PER_SECOND'];
  memoryUnits = ['MB', 'GB'];
  memoryUnitEphemeral = ['MB', 'GB'];
  storageUnits = ['MB', 'GB'];


    constructor(private cfService: CloudFormationService, public catalogService: AwsCatalogService) {}

    showSuccessMessage: boolean = false;
    
    lambdaForm = new FormGroup({
      codeLocation: new FormControl('', [Validators.required]), //
      runtime: new FormControl('', [Validators.required]), //
      s3Bucket: new FormControl('', [Validators.required]), //
      s3Key: new FormControl('', [Validators.required]), //
      numRequests: new FormControl('', [Validators.required]), //
      requestsUnit: new FormControl('', [Validators.required]), //
      duration: new FormControl('', [Validators.required]), //
      memoryValue: new FormControl('', [Validators.required]),//
      memoryUnit: new FormControl('', [Validators.required]),//
      storageValue: new FormControl('', [Validators.required]),//
      storageUnit: new FormControl('', [Validators.required]),//
      role: new FormControl('', [Validators.required]), //
      region: new FormControl('', [Validators.required]), //
      architecture: new FormControl('', [Validators.required]), //
    });
    
    
    get codeLocation() {
      return this.lambdaForm.get('codeLocation');
    }
    get runtime() {
      return this.lambdaForm.get('runtime');
    }
    get s3Bucket() {
      return this.lambdaForm.get('s3Bucket');
    }
    get s3Key() {
      return this.lambdaForm.get('s3Key');
    }
    get numRequests() {
      return this.lambdaForm.get('numRequests');
    }
    get requestsUnit() {
      return this.lambdaForm.get('requestsUnit');
    }
    get duration() {
      return this.lambdaForm.get('duration');
    }
    get memoryValue() {
      return this.lambdaForm.get('memoryValue');
    }
    
    get memoryUnit() {
      return this.lambdaForm.get('memoryUnit');
    }
    get storageValue() {
      return this.lambdaForm.get('storageValue');
    }
    get storageUnit() {
      return this.lambdaForm.get('storageUnit');
    }
    get role() {
      return this.lambdaForm.get('role');
    }
    get region() {
      return this.lambdaForm.get('region');
    }
    get architecture() {
      return this.lambdaForm.get('architecture');
    }


    onSubmit(formData: any) {
      const costs = this.calculateCost(formData)
      console.log(this.lambdaForm.value);
      this.showSuccessMessage = true;

      let cloudFormation =  this.cfService.generateCloudFormationTemplate(formData)
      let pricingInfo = this.cfService.generateFinanceInformation('Lambda', formData)

      let LambdaProduct : LambdaProduct = {
        name: 'Lambda',
        id: 0,
        cloudFormation: cloudFormation,
        cost: pricingInfo,
        pricing: costs
      }
      this.cfService.generateCloudFormationTemplate(formData); 
      this.cfService.generateFinanceInformation('Lambda',formData)
      this.catalogService.add(LambdaProduct)
      console.log("**CART:**",this.catalogService)
  
  }
  calculateCost(formData: any): { upfront: number, monthly: number, annual: number } {
    let unitsForRequest = 0
    if (formData.requestsUnit == "PER_SECOND") {
      unitsForRequest = 2628000
    } else if (formData.requestsUnit == "PER_MINUTE") {
      unitsForRequest = 43800
    } else if (formData.requestsUnit == "PER_HOUR") {
      unitsForRequest = 730
    } else if (formData.requestsUnit == "PER_DAY") {
      unitsForRequest = 30.42
    } else if (formData.requestsUnit == "PER_MONTH") {
      unitsForRequest = 1
    } else if (formData.requestsUnit == "PER_MINUTE") {
      unitsForRequest = 43800
    } else {
      unitsForRequest = 1000000
    }
    let requestsPerMonth = formData.numRequests * unitsForRequest
    let requestsCost = (requestsPerMonth - 1000000) * 0.0000002
    if (requestsCost < 0) {
      requestsCost = 0
    }
    let memoryVal = 0
    if (formData.memoryValue == "GB") {
      memoryVal = 1
    } else {
      memoryVal = 0.0009765625
    }
    let totalCompute = (formData.numRequests * unitsForRequest * formData.duration * 0.001) * memoryVal
    let computeCost = (totalCompute - 400000) * 0.0000166667 
    if (computeCost < 0) {
      computeCost = 0
    }
    let ephemeralUnit = 0
    if (formData.storageUnit == "GB") {
      ephemeralUnit = 1
    } else {
      ephemeralUnit = 0.0009765625
    }
    
    
    let storageCost = ((formData.storageValue * ephemeralUnit) - 0.50) * ((requestsPerMonth * formData.duration * 0.001) * 0.0000000309)


    // Assuming monthly for now. Adjust as needed.
    const totalMonthlyCost = requestsCost + computeCost + storageCost
    console.log(totalMonthlyCost)
    const roundedMonthly =  Math.round(totalMonthlyCost * 100) / 100
    console.log(roundedMonthly)
    return {
        upfront: 0, // Assuming no upfront costs
        monthly: roundedMonthly,
        annual: totalMonthlyCost * 12
    };
}
}

					