import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudFormationService {

  generateCloudFormationTemplate(formData: any): string {
    const cloudFormationTemplate = {
    RDSInstance: {
      Type: "AWS::RDS::DBInstance",
      Properties: {
        Engine: formData.Engine,
        AllocatedStorage: formData.allocatedStorage,
        DBInstanceClass: formData.dbInstanceClass,
        MasterUsername: formData.masterUsername,
        MasterUserPassword: formData.masterUserPassword
      }
    },
  }
    console.log(JSON.stringify(cloudFormationTemplate, null, 2));
    return JSON.stringify(cloudFormationTemplate, null, 2);
  }

  generateFinanceInformation(serviceName: string, formData: any) {
    const FinanceInformation = 
    {     
          Service: serviceName,
          Utilization: {
            UtilizationType: formData.utilizationType,
            UtilizationUnits: formData.utilizationValue,
        },
        DeploymentOption: formData.deploymentOption,
        Storage:{
            StorageAmount: formData.storageAmountValue,
            StorageAmountUnit: formData.storageAmountUnit,
        },
        RetentionPeriod: formData.retentionPeriod,
        BackupStorage:{
            AdditionalBackupStorage: formData.additionalBackupStorageValue,
            AdditionalBackupStorageUnit: formData.additionalBackupStorageUnit,
            BackupForExport: formData.backupSize,
            BackupForExportUnit: formData.backupPeriod
        },

    };
    return(FinanceInformation)
    console.log(FinanceInformation)
  }


}
