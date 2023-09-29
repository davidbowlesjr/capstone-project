import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AwsCatalogService } from '../service/aws-catalog.service';
import { S3Product } from './s3.model';
import { S3CloudFormationService } from './s3-cloudFormation.service';

@Component({
  selector: 'app-s3',
  templateUrl: './s3.component.html'
  //styleUrls: ['./s3.component.css']
})
export class S3Component {

  constructor(public catalogService: AwsCatalogService,
              private cfService: S3CloudFormationService) {  }

              
  showSuccessMessage: boolean = false;
  showContinueButton: boolean = false;

  s3Form = new FormGroup({
    bucketName : new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    region : new FormControl('', [
      Validators.required
    ]),
    storageAmount : new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
    storageUnits : new FormControl('', [
      Validators.required
    ]),
    moveType : new FormControl('', [
      Validators.required
    ]),
    averageObjSize : new FormControl('', [
      Validators.min(1)
    ]),
    averageObjSizeUnits : new FormControl('', [

    ]),
    numRequests : new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
    miscRequests : new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
    returnedByS3SelectNum : new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
    returnedByS3SelectUnits : new FormControl('', [
      Validators.required
    ]),
    scannedByS3SelectNum : new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
    scannedByS3SelectUnits : new FormControl('', [
      Validators.required
    ]),

  })

  get bucketName() {
      return this.s3Form.get('bucketName')
  }
  get region() {
      return this.s3Form.get('region')
  }
  get storageAmount() {
      return this.s3Form.get('storageAmount')
  }
  get storageUnits() {
      return this.s3Form.get('storageUnits')
  }
  get moveType() {
      return this.s3Form.get('moveType')
  }
  get averageObjSize() {
      return this.s3Form.get('averageObjSize')
  }
  get averageObjSizeUnits() {
      return this.s3Form.get('averageObjSizeUnits')
  }
  get numRequests() {
      return this.s3Form.get('numRequests')
  }
  get miscRequests() {
    return this.s3Form.get('miscRequests')
}
  get returnedByS3SelectNum() {
      return this.s3Form.get('returnedByS3SelectNum')
  }
  get returnedByS3SelectUnits() {
      return this.s3Form.get('returnedByS3SelectUnits')
  }
  get scannedByS3SelectNum() {
      return this.s3Form.get('scannedByS3SelectNum')
  }
  get scannedByS3SelectUnits() {
      return this.s3Form.get('scannedByS3SelectUnits')
  }

  onSubmit(formData : any) {
    const costs = this.calculateCost(formData)

    console.log(this.s3Form.value);
    this.showSuccessMessage = true;
    this.showContinueButton = true;

    const cloudFormationTemplate = this.cfService
        .generateCloudFormationTemplate(this.bucketName!.value || "")

    let s3Product : S3Product = {
      name: "S3 Standard",
      id: 0,
      cloudFormation: cloudFormationTemplate,
      cost: {
        region: this.region!.value?.toString() || "",
        storage: {
          amount: parseInt(this.storageAmount!.value?.toString() || ""),
          units: this.storageUnits!.value?.toString() || ""
        },
        moveType: this.moveType!.value?.toString() || "",
        averageObj: {
          size: parseInt(this.averageObjSize!.value?.toString() || ""),
          units: this.averageObjSizeUnits!.value?.toString() || ""
        },
        numRequests: parseInt(this.numRequests!.value?.toString() || ""),
        miscRequests: parseInt(this.miscRequests!.value?.toString() || ""),
        returnedByS3: {
          amount: parseInt(this.returnedByS3SelectNum!.value?.toString() || ""),
          units: this.returnedByS3SelectUnits!.value?.toString() || ""
        },
        scannedByS3: {
          amount: parseInt(this.scannedByS3SelectNum!.value?.toString() || ""),
          units: this.scannedByS3SelectUnits!.value?.toString() || ""
        }
      },
      pricing: costs

    }

    this.catalogService.add(s3Product)
  }
  calculateCost(formData: any): { upfront: number, monthly: number, annual: number } {
    let upfrontCost = 0
    let storageUnit = 0
    if (formData.storageUnits == "TB") {
      storageUnit = 1024
    } else {
      storageUnit = 1
    }
    let objSizeUnit = 0
    if (formData.moveType == "not-already-stored") {
      if (formData.averageObjSizeUnits == "MB") {
        objSizeUnit = 0.0009765625
      } else {
        objSizeUnit = 1
      }
      upfrontCost = Math.round(((formData.storageAmount * storageUnit) / (formData.averageObjSize * objSizeUnit))) * 0.000005
      console.log(objSizeUnit)
    } else {
      upfrontCost = 0;
    }
    let storagePartition = 0
    let storageCost = 0
    if ((formData.storageAmount * storageUnit) > 51200) {
      storagePartition = 51200
      storageCost = (storagePartition * 0.023) + (((formData.storageAmount * storageUnit) - 51200) * 0.022)
    } else {
    storageCost = formData.storageAmount * storageUnit * 0.023
    }
    let put_copy_post_list_cost = formData.numRequests * 0.000005
    let miscRequestCost = formData.miscRequests * 0.0000004

    let returnedUnit = 0
    if (formData.returnedByS3SelectUnits == "TB") {
      returnedUnit = 1024
    } else {
      returnedUnit = 1
    }
    const returnedCost = formData.returnedByS3SelectNum * returnedUnit * 0.0007

    let scannedUnit = 0
    if (formData.scannedByS3SelectUnits == "TB") {
      scannedUnit = 1024
    } else {
      scannedUnit = 1
    }
    const scannedCost = formData.scannedByS3SelectNum * scannedUnit * 0.002

    // Assuming monthly for now. Adjust as needed.
    const totalMonthlyCost = storageCost + put_copy_post_list_cost + miscRequestCost + returnedCost + scannedCost
    const monthlyRounded = Math.round(totalMonthlyCost * 100) / 100
    return {
        upfront: upfrontCost, 
        monthly: monthlyRounded,
        annual: totalMonthlyCost * 12
    };
}

}

