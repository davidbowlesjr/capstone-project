import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SNSCloudFormationService {

  generateCloudFormationTemplate(formData: any): string {
    const cloudFormationTemplate = {
      SNS: {
        Type : "AWS::SNS::Topic",
        Properties : {
          Subscription : {
            Endpoint : formData.endpoint,
            Protocol : formData.protocol
          },
          TopicName :  formData.topicName,
        }
      }
    };
    console.log(JSON.stringify(cloudFormationTemplate, null, 2));
    return JSON.stringify(cloudFormationTemplate, null, 2);
  }

  generateFinanceInformation(serviceName: string, formData: any) {
    const FinanceInformation = 
    {
            Service: serviceName,
            Region: formData.region,
            Requests: {
                NumberOfRequests: formData.requests,
                RequestUnits: formData.requestUnits,
              },
            HTTPNotifications: {
              NumberOfHTTPNotifications: formData.httpNotifications,
              HTTPNotificationUnits: formData.httpNotificationUnits,
            },
            EmailNotifications: {
              NumberOfEmailNotifications: formData.emailNotifications,
              EmailNotificationUnits: formData.emailNotificationUnits
            },
            SQSNotifications: {
              NumberOfSQSNotifications: formData.sqsNotifications,
              SQSNotificationUnits: formData.sqsNotificationUnits,
            },
            InboundDataTransfer: {
              NumberOfInboundDataTransfers: formData.inboundDataTransfer,
              InboundDataUnits: formData.inboundUnits,
            },
            OutboundDataTransfer: {
              NumberOfOutboundDataTransfers: formData.outboundDataTransfer,
              OutboundUnits: formData.outboundUnits
            }
            
                    

    };
    console.log(FinanceInformation);
    return FinanceInformation;
  }

}
