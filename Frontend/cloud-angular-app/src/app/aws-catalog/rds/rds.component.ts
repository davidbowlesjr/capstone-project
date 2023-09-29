import { Component } from '@angular/core';
import { CloudFormationService } from './cloudformation.service';
import { AwsCatalogService } from '../service/aws-catalog.service';
import { RDSProduct } from './rds.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rds',
  templateUrl: './rds.component.html',
  styleUrls: ['./rds.component.css']
})
export class RDSComponent {
  dbInstanceClasses = ['db.t2.micro', 'db.t2.small', 'db.t2.medium', 'db.m4.large', 'db.m4.xlarge'];
  //utilizationTypes = ['%Utlized/Month', 'Hours/Day', 'Hours/Week', 'Hours/Month'];
  storageUnits = ['MB', 'GB', 'TB'];
  retentionPeriods = ['1 month', '2 months'];
  allocatedStorageValue: number = 20;
  
  constructor(private cfService: CloudFormationService, public catalogService: AwsCatalogService) {}

  showSuccessMessage: boolean = false;
  rdsForm = new FormGroup({
    nodes: new FormControl('', [Validators.required]),  //new
    allocatedStorage: new FormControl('', [Validators.required]),
    engine: new FormControl('', [Validators.required]),
    dbInstanceClass: new FormControl('', [Validators.required]),
    masterUsername: new FormControl('', [Validators.required]),
    masterPassword: new FormControl('', [Validators.required]),
    //utilizationValue: new FormControl('', [Validators.required]),
    deploymentOption: new FormControl('', [Validators.required]),
    // storageAmount: new FormControl('', [Validators.required]),
    // storageAmountUnit: new FormControl('', [Validators.required]), // add this line
    retentionPeriod: new FormControl('', [Validators.required]),
    additionalBackupStorage: new FormControl('', [Validators.required]),
    additionalBackupStorageUnit: new FormControl('', [Validators.required]), // add this line
    totalSizeBackup: new FormControl('', [Validators.required]),
    backupPeriod: new FormControl('', [Validators.required]), // add this line
  });
  
  
  get nodes() {
    return this.rdsForm.get('nodes');
  }
  get allocatedStorage() {
    return this.rdsForm.get('allocatedStorage');
  }
  get engine() {
    return this.rdsForm.get('engine');
  }
  get dbInstanceClass(){
    return this.rdsForm.get('dbInstanceClass');
  }
  get masterUsername(){
    return this.rdsForm.get('masterUsername');
  }
  get masterPassword(){
    return this.rdsForm.get('masterPassword');
  }
  // get utilizationValue(){
  //   return this.rdsForm.get('utilizationValue');
  // }
  get deploymentOption(){
    return this.rdsForm.get('deploymentOption');
  }
  // get storageAmount(){
  //   return this.rdsForm.get('storageAmount');
  // }
  get retentionPeriod(){
    return this.rdsForm.get('retentionPeriod');
  }
  get additionalBackupStorage(){
    return this.rdsForm.get('additionalBackupStorage');
  }
  get totalSizeBackup(){
    return this.rdsForm.get('totalSizeBackup');
  }
  
  onSubmit(formData: any) {
    console.log(this.rdsForm.value);    
    this.showSuccessMessage = true;
    let cloudFormation = this.cfService.generateCloudFormationTemplate(formData)
    //let pricingInfo = this.cfService.generateFinanceInformation('RDS', formData)
    const costs = this.calculateCost(formData)

    let RDSProduct : RDSProduct = {
      name: 'RDS',
      id: 0,
      cloudFormation: cloudFormation,
      cost: {
        nodes: parseInt(this.nodes!.value?.toString() || ""),
        allocatedStorage : parseInt(this.allocatedStorage!.value?.toString() || ""),
        engine: this.engine!.value?.toString() || "",
        dbInstanceClass: this.dbInstanceClass!.value?.toString() || "",
        masterUsername: this.masterUsername!.value?.toString() || "",
        masterPassword: this.masterPassword!.value?.toString() || "",
        deploymentOption: this.deploymentOption!.value?.toString() || "",
        retentionPeriod: this.retentionPeriod!.value?.toString() || "",
        additionalBackupStorage: parseInt(this.additionalBackupStorage!.value?.toString() || ""),
        totalSizeBackup: parseInt(this.totalSizeBackup!.value?.toString() || "")
      },
      pricing: costs
    }
    
      this.cfService.generateCloudFormationTemplate(formData); 
      this.cfService.generateFinanceInformation('RDS',formData)
      this.catalogService.add(RDSProduct)
      console.log("**CART:**",this.catalogService)
  }


  calculateCost(formData: any): { upfront: number, monthly: number, annual: number } {

    let nodes = formData.nodes
  
    //INSTANCE PRICING
    const rates: { [key: string]: { [deploymentOption: string]: number } } = {
      'db.t2.micro': {
        'Single-AZ': 0.036,
        'Multi-AZ': 0.072
      },
      'db.t2.small': {
        'Single-AZ': 0.072,
        'Multi-AZ': 0.144
      },
      'db.t2.medium': {
        'Single-AZ': 0.146,
        'Multi-AZ': 0.292
      },
      'db.m4.large': {
        'Single-AZ': 0.364,
        'Multi-AZ': 0.728
      },
      'db.m4.xlarge': {
        'Single-AZ': 0.73,
        'Multi-AZ': 1.46
      }
    };
    
    
    const instanceType: string = formData.dbInstanceClass; 
    const deploymentOption: string = formData.deploymentOption; 
    const rate: number = (rates[instanceType] && rates[instanceType][deploymentOption])
    let monthlyInstanceCost: number = nodes * rate * 730;
  
    //STORAGE PRICING 
    const storageRate = 0.23 //per GB
    let storageCost = formData.allocatedStorage * storageRate * nodes

    //BACKUP STORAGE PRICING 
    const backupStorageRate = 0.095 //per GB
    let backupStorageCost = formData.additionalBackupStorage * backupStorageRate

    const totalMonthlyCost = monthlyInstanceCost + storageCost + backupStorageCost

    return {
        upfront: 0, // Assuming no upfront costs
        monthly: totalMonthlyCost,
        annual: totalMonthlyCost * 12
    };
  }
}


