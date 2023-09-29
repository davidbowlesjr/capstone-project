import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudFormationService {

  generateCloudFormationTemplate(formData: any): string {
    const cloudFormationTemplate = {
      Lambda: {
        Type: 'AWS::Lambda::Function',
        Properties: {
          Handler: 'index.handler',
          Runtime: formData.runtime,
          Role: 'arn:aws:iam::535146832369:role/LambdaExecutionRoleLFG',
          Code: {
            S3Bucket: formData.s3Bucket,
            S3Key: formData.s3Key
          }
        }
      }
    };
    return JSON.stringify(cloudFormationTemplate, null, 2);
  }

  generateFinanceInformation(serviceName: string, formData: any) {
    const FinanceInformation = 
    {
            Service: serviceName,
            Region: formData.region,
            Architecture: formData.architecture,
            Requests: {
                NumberOfRequests: formData.numRequests,
                NumberOfRequestsUnits: formData.requestsUnit,
                DurationOfRequest: formData.duration,
              },
              Memory: {
                MemoryAllocated: formData.memoryValue,
                MemoryUnit: formData.memoryUnit,
              },
              EphemeralStorage: {
                EphemeralStorageAllocated: formData.storageValue,
                EphemeralStorageAllocatedUnit: formData.storageUnit

              }
          

    };
    return FinanceInformation;
  }
  

}
