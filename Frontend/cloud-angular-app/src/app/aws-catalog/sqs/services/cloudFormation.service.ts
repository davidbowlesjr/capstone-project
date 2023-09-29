import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudFormationService {

  generateCloudFormationTemplate(formData: any): string {
    const cloudFormationTemplate = {
      SQS: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: formData.queueName,
          DeadLetterQueue: formData.addDeadLetterQueue,
          StandardQueueRequests: formData.standardQueueRequests,
          FIFOQueueRequests: formData.fifoQueueRequests,
          DataTransferRegion: formData.outboundDataTransferRegion,
          DataTransferAmount: formData.outboundDataTransferAmount,
          DataTransferUnit: formData.outboundDataTransferUnit,
        }
      }
    };

    console.log(JSON.stringify(cloudFormationTemplate, null, 2));
    return JSON.stringify(cloudFormationTemplate, null, 2);
  }
}
