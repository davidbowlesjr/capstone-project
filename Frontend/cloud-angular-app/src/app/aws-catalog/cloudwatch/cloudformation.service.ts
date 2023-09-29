import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudWatchCloudFormationService {

  generateCloudFormationTemplate(formData: any): string {
    const cloudFormationTemplate = {
      CloudWatch: {
        Type : "AWS::CloudWatch::Alarm",
        Properties : {
          AlarmName :  formData.alarmName,
          EvaluationPeriods : formData.evaluationPeriod,
          ComparisonOperator : formData.comparisonOperator,
          Threshold: formData.threshold,
          AlarmActions: formData.alarmAction,
          DatapointsToAlarm : formData.numberOfBreaches
          
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
            Metrics: {
                NumberOfMetrics: formData.numberOfMetrics,
                NumberOfStandardResolution: formData.standardResolution,
                NumberOfHighResolution: formData.highResolution,
              },
              NumberOfCompositeAlarms: formData.compositeAlarms,
          

    };
    console.log(FinanceInformation);
    return FinanceInformation;
  }

}
