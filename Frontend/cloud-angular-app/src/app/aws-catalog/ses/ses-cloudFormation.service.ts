import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesCloudFormationService {

    generateCloudFormationTemplate(formData: any): string {
        const cloudFormationTemplate = {
          SES: {
            Type: 'AWS::SES::Instance',
            Properties: {
                Name: formData.name,
                EmailMessages:formData.emailMessages,
                EmailMessagesUnit:formData.emailMessagesUnit,
                DataSent:formData.dataSent,
                IPs:formData.IPs
            }
          }
        };
        return JSON.stringify(cloudFormationTemplate, null, 2);
    }


  generateFinanceInformation(formData: any) {
    const FinanceInformation = {
          
    };
  }


}
