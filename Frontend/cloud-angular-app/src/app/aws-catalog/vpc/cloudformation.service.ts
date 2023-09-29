import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VpcCloudFormationService {

  generateTemplate(formData: any): string {
    

    const cloudFormationTemplate = {
      VPC: {
        Type: 'AWS::EC2::VPC',
        Properties: {
            CidrBlock: formData.value.networkRange
        }
      }
    };
    
    console.log(cloudFormationTemplate)
    return JSON.stringify(cloudFormationTemplate, null, 2);
  }
}
