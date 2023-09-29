import { Component } from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import { CloudFormationService } from './cloudformation.service';
import { ec2Product } from './ec2.model';
import { AwsCatalogService } from '../service/aws-catalog.service';

@Component({
  selector: 'app-ec2',
  templateUrl: './ec2.component.html'
  //styleUrls: ['./ec2.component.css']
})
export class Ec2Component {

  showSuccessMessage: boolean = false;
  showContinueButton: boolean = false;

  ec2Form = new FormGroup({  
    instanceType: new FormControl('', [
      Validators.required
  ]),
  location:new FormControl('',[
    Validators.required
  ]),
  imageID:new FormControl('',[
    Validators.required
  ]),
  keyName:new FormControl('',[
    Validators.required
  ]),
  securityGroups:new FormControl('',[
    Validators.required
  ]),
  operatingSystem:new FormControl('',[
    Validators.required
  ]),
    paymentOption: new FormControl('', [
      Validators.required
    ]),
    leaseContractLength: new FormControl({value: '', disabled: true}, [
      Validators.required
    ]),
    purchaseOption: new FormControl({value: '', disabled: true}, [
      Validators.required
    ]),

 })

get location(){
  return this.ec2Form.get('location')
} 
get instanceType(){
  return this.ec2Form.get('instanceType')
} 
get imageID(){
  return this.ec2Form.get('imageID')
}
get keyName(){
  return this.ec2Form.get('keyName')
}
get numInstances(){
  return this.ec2Form.get('numInstances')
} 
get securityGroups(){
  return this.ec2Form.get('securityGroups')
}
get operatingSystem(){
  return this.ec2Form.get('operatingSystem')
}
get paymentOption(){
  return this.ec2Form.get('paymentOption')
}

constructor(private cfService: CloudFormationService, public catalogService: AwsCatalogService) {

  this.paymentOption?.valueChanges.subscribe(selectedOption => {
  if (selectedOption === 'Reserved Instances') {
    this.ec2Form.get('leaseContractLength')?.enable();
    this.ec2Form.get('purchaseOption')?.enable();
  } else {
    this.ec2Form.get('leaseContractLength')?.disable();
    this.ec2Form.get('purchaseOption')?.disable();
  }
});


}

async onSubmit(formData: any) {

  const jsonString = this.cfService.generateTemplate(formData);
  let monthlyPrice = 0;
  let upfrontPrice = 0;

  const instanceType = formData.instanceType;
  const location = formData.location;
  const operatingSystem = formData.operatingSystem;
///////////////////////////////////////////////////////////////////////////////////////
//                                      EC2 On Demand
///////////////////////////////////////////////////////////////////////////////////////
if (formData.paymentOption === 'On-Demand') {
  try {
    const pricingDetails: any = await this.cfService.getPricingDetails(instanceType, location, operatingSystem);
    
    if (pricingDetails && pricingDetails.PriceList) {
      for (const priceListItem of pricingDetails.PriceList) {
        const pricingDetailsObject = JSON.parse(priceListItem);
        
        if (pricingDetailsObject.terms && pricingDetailsObject.terms.OnDemand) {
          for (const onDemandKey in pricingDetailsObject.terms.OnDemand) {
            const onDemandTerm = pricingDetailsObject.terms.OnDemand[onDemandKey];
            
            for (const priceDimensionKey in onDemandTerm.priceDimensions) {
              const priceDimension = onDemandTerm.priceDimensions[priceDimensionKey];
              const usdPrice = priceDimension.pricePerUnit.USD;
              
              // Construct the expected description using the parameters
              const expectedDescription = `$${parseFloat(usdPrice).toFixed(4)} per On Demand ${operatingSystem} ${instanceType} Instance`;

              // Check if the description matches the expected description
              if (priceDimension.description.startsWith(expectedDescription) && parseFloat(usdPrice) > 0) {
                console.log('On Demand Price (hourly):', usdPrice);
                monthlyPrice = parseFloat(usdPrice) * 730;
                break;
              }
            }
          }
        }
      }
    } else {
      console.error('Invalid pricing details:', pricingDetails);
    }
  } catch (error) {
    console.error('Failed to get On-Demand pricing details:', error);
  }

///////////////////////////////////////////////////////////////////////////////////////
//                                      EC2 Spot Instances
///////////////////////////////////////////////////////////////////////////////////////
} else if (formData.paymentOption === 'Spot-Instances') {
  try {
    const operatingSystem = formData.operatingSystem;
    const spotPricingDetails: any = await this.cfService.getSpotPricingDetails(instanceType, location, operatingSystem).toPromise();

      const usdPrice = spotPricingDetails.spotPrice;
      console.log('Spot Price (hourly):', usdPrice);
      monthlyPrice = parseFloat(usdPrice) * 730;
  } catch (error) {
      console.error('Failed to get Spot pricing details:', error);
  }
}

///////////////////////////////////////////////////////////////////////////////////////
//                                      EC2 Reserved Instaces
///////////////////////////////////////////////////////////////////////////////////////

else if (formData.paymentOption === 'Reserved Instances') {
  try {
    let leaseContractLength = '';
    const leaseContractLengthControl = this.ec2Form.get('leaseContractLength');
    if (leaseContractLengthControl && leaseContractLengthControl.value) {
      leaseContractLength = leaseContractLengthControl.value.toString();
    }

    let purchaseOption = '';
    const purchaseOptionControl = this.ec2Form.get('purchaseOption');
    if (purchaseOptionControl && purchaseOptionControl.value) {
      purchaseOption = purchaseOptionControl.value.toString();
    }

    const reservedPricingDetails: any = await this.cfService.getReservedPricingDetails(instanceType, location, operatingSystem, leaseContractLength, purchaseOption);
    console.log("Reserved Pricing Details", reservedPricingDetails)
    let minHourlyPrice: number = Number.POSITIVE_INFINITY;
    let minUpfrontPrice: number = Number.POSITIVE_INFINITY;

    if (reservedPricingDetails && reservedPricingDetails.terms && reservedPricingDetails.terms.Reserved) {
      for (const reservedKey in reservedPricingDetails.terms.Reserved) {
        const reservedTerm = reservedPricingDetails.terms.Reserved[reservedKey];

        const termLeaseContractLength = reservedTerm.termAttributes.LeaseContractLength;
        const termPurchaseOption = reservedTerm.termAttributes.PurchaseOption;

        if (termLeaseContractLength === leaseContractLength && termPurchaseOption === purchaseOption) {
          for (const priceDimensionKey in reservedTerm.priceDimensions) {
            const priceDimension = reservedTerm.priceDimensions[priceDimensionKey];
            const usdPrice = parseFloat(priceDimension.pricePerUnit.USD);

            if (priceDimension.description.includes('Upfront Fee')) {
              minUpfrontPrice = Math.min(minUpfrontPrice, usdPrice);
            } else {
              minHourlyPrice = Math.min(minHourlyPrice, usdPrice);
            }
          }
        }
      }
    } else {
      console.error('Invalid reserved pricing details:', reservedPricingDetails);
    }

    if (minHourlyPrice === Number.POSITIVE_INFINITY){
      minHourlyPrice = 0.00
    }
    if (minUpfrontPrice === Number.POSITIVE_INFINITY){
      minUpfrontPrice = 0.00
    }

    console.log('Hourly Price: ', minHourlyPrice)
    console.log('Minimum Monthly Price:', 720* minHourlyPrice);
    monthlyPrice = minHourlyPrice * 720;
    console.log('Minimum Upfront Fee:', minUpfrontPrice);
    upfrontPrice = minUpfrontPrice


  } catch (error) {
    console.error('Failed to get Reserved pricing details:', error);
  }

}
this.showSuccessMessage = true;
this.showContinueButton = true;
///////////////////////////////////////////////////////////////////////////////////////
//                                     
///////////////////////////////////////////////////////////////////////////////////////

  let ec2Product: ec2Product = {
    name: "EC2 Instance",
    id: 1,
    cloudFormation: jsonString,
    cost: {
      InstanceType: this.instanceType!.value?.toString() || "",
      OperatingSystem: this.operatingSystem!.value?.toString() || ""
    },
    pricing: {
      upfront: upfrontPrice,
      monthly: monthlyPrice,
      annual: monthlyPrice * 12 + upfrontPrice
    }
  };
  this.catalogService.add(ec2Product);
  console.log('CloudFormation Template:', jsonString);
}


private getUSDPrice(pricingDetails: any): string | null {
  try {
    const onDemandKey = Object.keys(pricingDetails.terms.OnDemand)[0];
    const priceDimensionsKey = Object.keys(pricingDetails.terms.OnDemand[onDemandKey].priceDimensions)[0];
    const usdPrice = pricingDetails.terms.OnDemand[onDemandKey].priceDimensions[priceDimensionsKey].pricePerUnit.USD;
    return usdPrice;
  } catch (error) {
    console.error('Failed to extract USD price:', error);
    return null;
  }
}


}