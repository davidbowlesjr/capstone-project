import { Component } from '@angular/core';
import { AwsCatalogService } from '../service/aws-catalog.service';
import { SesCloudFormationService } from './ses-cloudFormation.service';
import { SesProduct } from './ses.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-ses',
  templateUrl: './ses.component.html',
  styleUrls: ['./ses.component.css']
})
export class SesComponent {
  constructor(public catalogService: AwsCatalogService, private cfService: SesCloudFormationService) {}
  
  showSuccessMessage: boolean = false;

  sesForm = new FormGroup({
    configurationSet: new FormControl('', [Validators.required]),
    emailMessages: new FormControl('',[Validators.required]),
    emailMessagesUnit: new FormControl('',[Validators.required]),
    dataSent: new FormControl('',[Validators.required]),
    IPs: new FormControl('',[Validators.required])
  });

  get configurationSet() {
    return this.sesForm.get('configurationSet');
    
  }
  get emailMessages(){
    return this.sesForm.get('emailMessages');
  }
  get emailMessagesUnit(){
    return this.sesForm.get('emailMessagesUnit');
  }
  get dataSent(){
    return this.sesForm.get('dataSent');
  }
  get IPs(){
    return this.sesForm.get('IPs');
  }

  onSubmit(formData: any) {
      console.log(this.sesForm.value);
      this.showSuccessMessage = true;

      let cloudFormation =  this.cfService.generateCloudFormationTemplate(formData)
      let pricingInfo = this.cfService.generateFinanceInformation('SES')
      const costs = this.calculateCost(formData)
      let sesProduct : SesProduct = {
        name: 'SES',
        id: 0,
        cost : {
          emailMessages : this.emailMessages!.value?.toString() || "",
          dataSent : parseInt(this.dataSent!.value?.toString() || ""),
          IPs: parseInt(this.IPs!.value?.toString() || ""),
        
      },
      pricing: costs,
        cloudFormation: cloudFormation,
        SES: {
          Type: "AWS::SES::ConfigurationSet",
          Properties: {
            "Name": 'SES',
            "Email Messages from EC2":formData.emailMessages,
            "Email Messages from EC2 Unit":formData.emailMessagesUnit,
            "Data Sent from EC2":formData.dataSent,
            "Number of Dedicated IP(standard) Addresses":formData.IPs
          }
        }
      }
    console.log('Form Data:', formData);
    this.cfService.generateCloudFormationTemplate(formData); 
    this.cfService.generateFinanceInformation(formData)
    this.catalogService.add(sesProduct)
    console.log("**CART:**",this.catalogService)

}

calculateCost(formData: any): { upfront: number, monthly: number, annual: number } {
   let emailMessages=0;
  if(formData.emailMessagesUnit==='per day'){
    const emailMessage = formData.emailMessages *(730/24)*.0001;
    emailMessages=emailMessage
  }
  else if(formData.emailMessagesUnit==='per week'){
    const emailMessage = formData.emailMessages *(730/168)*.0001;
    emailMessages=emailMessage;
  }
  else{
    const emailMessage = formData.emailMessages*.0001;
    emailMessages=emailMessage
  }
  
  const dataSent = formData.dataSent * 0.12;
  const IPs = formData.IPs * 24.95;

  // Assuming monthly for now. Adjust as needed.
  const totalMonthlyCost = emailMessages + dataSent + IPs;

  return {
      upfront: 0, // Assuming no upfront costs
      monthly: totalMonthlyCost,
      annual: totalMonthlyCost * 12
  };
}


}