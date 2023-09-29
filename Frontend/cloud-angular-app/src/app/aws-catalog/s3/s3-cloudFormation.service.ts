import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class S3CloudFormationService {

  generateCloudFormationTemplate(bucketName: string): string {
    const cloudFormationTemplate = {
      S3: {
        Type: 'AWS::S3::Bucket',
        Properties: {
            BucketName: bucketName
        }
      }
    };
    return JSON.stringify(cloudFormationTemplate, null, 2);
  }

  generateFinanceInformation(formData: any) {
    // const FinanceInformation = 
    // {
    //       Data: {
    //         Region: formData.region,
    //         Architecture: formData.architecture,
    //         NumberOfRequests: formData.numRequests,
    //         NumberOfRequestsUnits: formData.requestsUnit,
    //         DurationOfRequest: formData.duration,
    //         MemoryAllocated: formData.memoryValue,
    //         MemoryUnit: formData.memoryUnit,
    //         EphemeralStorageAllocated: formData.storageValue,
    //         EphemeralStorageAllocatedUnit: formData.storageUnit
    //       }

    // };
    // console.log(FinanceInformation)
  }
  

}
