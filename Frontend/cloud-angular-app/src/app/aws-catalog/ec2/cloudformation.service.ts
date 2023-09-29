import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudFormationService {
  constructor(private http: HttpClient) {}

  getPricingDetails(instanceType: string, location: string, operatingSystem: string) {
    return this.http.post('http://localhost:3000/getPricing', {
      instanceType,
      location,
      operatingSystem,
    }).toPromise();
  }

  getSpotPricingDetails(instanceType: string, location: string, operatingSystem: string): Observable<any> {
    const body = { instanceType, location, operatingSystem };
    return this.http.post<any>('http://localhost:3000/getSpotPricing', body);
  }
  

getReservedPricingDetails(instanceType: string, location: string, operatingSystem: string, leaseContractLength: string, purchaseOption: string) {
  const body = { instanceType, location, operatingSystem, leaseContractLength, purchaseOption };
  return this.http.post('http://localhost:3000/getReservedPricing', body).toPromise();
}

  generateTemplate(formData: any): string {
    let secGroups:string[]
    secGroups=formData.securityGroups.split(',')
    const cloudFormationTemplate = {
      EC2: {
        Type: 'AWS::EC2::Instance',
        Properties: {
         InstanceType:formData.instanceType,
         ImageId:formData.imageID,
         KeyName:formData.keyName,
         SecurityGroups:secGroups
        }
      },
    };
    console.log("Test:",cloudFormationTemplate)
    return JSON.stringify(cloudFormationTemplate, null, 2);
  }
}
