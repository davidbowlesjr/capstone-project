import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamoCloudFormationService {

  generateCloudFormationTemplate(formData: any): string {
    const cloudFormationTemplate = {
      DynamoDBTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: formData.tableName,
          AttributeDefinitions: 
            {
                AttributeName: formData.attributeDefinitionName,
                AttributeType: formData.attributeType
            }
            ,
            KeySchema: 
            {
                KeySchemaAttributeName: formData.keySchemaAttributeName,
                KeyType: formData.keyType
            }
            ,
            ProvisionedThroughput: {
              ReadCapacityUnits: formData.readCapacityUnits,
              WriteCapacityUnits: formData.writeCapacityUnits
            }

        }
      }
    };
    console.log(JSON.stringify(cloudFormationTemplate, null, 2));
    return JSON.stringify(cloudFormationTemplate, null, 2);
  }

  generateFinanceInformation(formData: any) {
    const financeInformation = 
    {
           
            Region: formData.region,
            //questions begin here
            TableClass: formData.tableClass,
            DataStorage: {
                storageSize: formData.storageSize,
                storageSizeUnit: formData.storageSizeUnit,
                averageItemSize: formData.avgItemSize,
                avgItemSizeUnit: formData.avgItemSizeUnit
              },
              Write: {
                nonTransactionalWritePercent: formData.nonTransactionalWritePercent,
                transactionalWritePercent: formData.transactionalWritePercent,
                baselineWriteRate: formData.baselineWriteRate,
                baselineWriteRateUnit: formData.baselineWriteRateUnit,
                peakWriteRate: formData.peakWriteRate,
                peakWriteRateUnit: formData.peakWriteRateUnit,
                durationPeakWrite: formData.durationPeakWrite,
                durationPeakWriteUnit: formData.durationPeakWriteUnit,
                percentBaselineWriteCovered: formData.percentBaselineWriteCovered,
                writeReservedTerm: formData.writeReservedTerm,
              },
              Read: {
                eventuallyConsistentPercent: formData.eventuallyConsistentPercent,
                stronglyConsistentPercent: formData.stronglyConsistentPercent,
                transactionPercent: formData.transactionPercent,
                baselineReadRate: formData.baselineReadRate,
                baselineReadUnit: formData.baselineReadUnit,
                peakReadRate: formData.peakReadRate,
                peakReadUnit: formData.peakReadUnit,
                readPeakDuration: formData.readPeakDuration,
                readPeakDurationUnit: formData.readPeakDurationUnit,
                baselinePercentRead: formData.baselinePercentRead,
                readReservedCapacity: formData.readReservedCapacity


              }
          

    };
    return financeInformation;
  }
  

}

