import { Component } from '@angular/core';
import { AwsCatalogService } from '../service/aws-catalog.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DynamoProduct, isDynamoProduct } from './dynamo.model';
import { DynamoCloudFormationService } from './cloudformation.service';


@Component({
  selector: 'app-dynamo',
  templateUrl: './dynamo.component.html',
  styleUrls: ['./dynamo.component.css']
})
export class DynamoComponent {

  constructor(private cfService: DynamoCloudFormationService, 
              public catalogService: AwsCatalogService) {

   }
    showSuccessMessage: boolean = false;

    attributeTypes: string[] = ['Binary', 'Num', 'Str'];
    keyTypes : string[] = ['HASH', 'RANGE'];
    regions : string[] = ['US_EAST_1','US_EAST_2', 'US_WEST_1', 'US_WEST_2',  'CA_CENTRAL_1']; 
    classes : string[] = ['Standard', 'Standard-Infrequent Access']
    avgStorageUnits : string[] = ['GB', 'TB'];
    avgItemUnits: string[] = ['KB', 'Byte'];
    perSecond: string[] = ['per second'];
    perMonth: string[] = ['hours per month'];
    years: string[] = ['1 year', '3 years'];

    dynamoForm = new FormGroup({ 
      
      tableName : new FormControl('', Validators.required),
      attributeDefinitionName : new FormControl('', Validators.required),
      attributeType : new FormControl('', Validators.required),
      keySchemaAttributeName : new FormControl('', Validators.required),
      keyType : new FormControl('', Validators.required),
      readCapacityUnits : new FormControl('', Validators.required),
      writeCapacityUnits : new FormControl('', Validators.required),
      //Cost 
      region: new FormControl('', Validators.required),
      tableClass: new FormControl('', Validators.required),
      storageSize: new FormControl('', Validators.required),
      storageSizeUnit: new FormControl('', Validators.required),
      avgItemSize: new FormControl('', Validators.required),
      avgItemSizeUnit: new FormControl('', Validators.required),
      //Cost- Write
      nonTransactionalWritePercent: new FormControl('', Validators.required),
      transactionalWritePercent: new FormControl('', Validators.required),
      baselineWriteRate: new FormControl('', Validators.required),
      baselineWriteRateUnit: new FormControl('', Validators.required),
      peakWriteRate: new FormControl('', Validators.required),
      peakWriteRateUnit: new FormControl('', Validators.required),
      durationPeakWrite: new FormControl('', Validators.required),
      durationPeakWriteUnit: new FormControl('', Validators.required),
      percentBaselineWriteCovered: new FormControl('', Validators.required),
      writeReservedTerm: new FormControl('', Validators.required),
      //Cost - Read
      eventuallyConsistentPercent: new FormControl('', Validators.required),
      stronglyConsistentPercent: new FormControl('', Validators.required),
      transactionPercent: new FormControl('', Validators.required),
      baselineReadRate: new FormControl('', Validators.required),
      baselineReadUnit:new FormControl('', Validators.required),
      peakReadRate: new FormControl('', Validators.required),
      peakReadUnit: new FormControl('', Validators.required),
      readPeakDuration: new FormControl('', Validators.required),
      readPeakDurationUnit: new FormControl('', Validators.required),
      baselinePercentRead: new FormControl('', Validators.required),
      readReservedCapacity: new FormControl('', Validators.required),


   })

   get tableName () {
    return this.dynamoForm.get('tableName')
   }
   get region () {
    return this.dynamoForm.get('region')
   }
   
   
   get attributeDefinitionName () {
    return this.dynamoForm.get('attributeDefinitionName')
   }
   get attributeType() {
    return this.dynamoForm.get('attributeType')
   }
   get keySchemaAttributeName() {
    return this.dynamoForm.get('keySchemaAttributeName')
   }
   get keyType() {
    return this.dynamoForm.get('keyType')
   }
   get readCapacityUnits() {
    return this.dynamoForm.get('readCapacityUnits')
   }
   get writeCapacityUnits() {
    return this.dynamoForm.get('writeCapacityUnits')
   }
   get tableClass() {
    return this.dynamoForm.get('tableClass')
   }
   get storageSize(){
    return this.dynamoForm.get('storageSize')
   }
   get storageSizeUnit(){
    return this.dynamoForm.get('storageSizeUnit')
   }
  
   get avgItemSize(){
    return this.dynamoForm.get('avgItemSize')
   }
   get avgItemSizeUnit(){
    return this.dynamoForm.get('avgItemSizeUnit')
   }

   get nonTransactionalWritePercent(){
    return this.dynamoForm.get('nonTransactionalWritePercent')
   }
   get transactionalWritePercent(){
    return this.dynamoForm.get('transactionalWritePercent')
   }
   get baselineWriteRate(){
    return this.dynamoForm.get('baselineWriteRate')
   }
   get baselineWriteRateUnit(){
    return this.dynamoForm.get('baselineWriteRateUnit')
   }
   get peakWriteRate(){
    return this.dynamoForm.get('peakWriteRate')
   }
   get peakWriteRateUnit(){
    return this.dynamoForm.get('peakWriteRateUnit')
   }
   get durationPeakWrite(){
    return this.dynamoForm.get('durationPeakWrite')
   }
   get durationPeakWriteUnit(){
    return this.dynamoForm.get('durationPeakWriteUnit')
   }
   get percentBaselineWriteCovered(){
    return this.dynamoForm.get('percentBaselineWriteCovered')
   }
   get writeReservedTerm(){
    return this.dynamoForm.get('writeReservedTerm')
   }
   get eventuallyConsistentPercent(){
    return this.dynamoForm.get('eventuallyConsistentPercent')
   }
   get stronglyConsistentPercent(){
    return this.dynamoForm.get('stronglyConsistentPercent')
   }
   get transactionPercent(){
    return this.dynamoForm.get('transactionPercent')
   }
   get baselineReadRate(){
    return this.dynamoForm.get('baselineReadRate')
   }
   get baselineReadUnit(){
    return this.dynamoForm.get('baselineReadUnit')
   }
   get peakReadRate(){
    return this.dynamoForm.get('peakReadRate')
   }
   get peakReadUnit(){
    return this.dynamoForm.get('peakReadUnit')
   }
   get readPeakDuration(){
    return this.dynamoForm.get('readPeakDuration')
   }
   get readPeakDurationUnit(){
    return this.dynamoForm.get('readPeakDurationUnit')
   }
   get baselinePercentRead(){
    return this.dynamoForm.get('baselinePercentRead')
   }
   get readReservedCapacity(){
    return this.dynamoForm.get('readReservedCapacity')
   }
      
  
    


   onSubmit() {

    console.log("form:", this.dynamoForm.value);
    let dynamoCFProduct =  this.cfService.generateCloudFormationTemplate(this.dynamoForm.value);
    console.log("cf product:",dynamoCFProduct);
    this.showSuccessMessage = true;
    const costs = this.calculateCost();

    let dynamoProduct : DynamoProduct = {
      name : "DynamoDB",
      id : 0,
      cloudFormation : dynamoCFProduct,
      cost : {
        //cost
        //0.25USD *GB 
        Region : this.region!.value?.toString() || "",
        TableClass : this.tableClass!.value?.toString() || "",

        DataStorage: {
            StorageSize: parseInt(this.storageSize!.value?.toString() || ""), //0.25USD *GB || 256.0USD * TB (DATA STORAGE COST)
            StorageSizeUnit: this.storageSizeUnit!.value?.toString() || "",
            AvgItemSize: parseInt(this.avgItemSize!.value?.toString() || ""),
            AvgItemSizeUnit: this.avgItemSizeUnit!.value?.toString() || "",
        },
        Write: { //(WRITE COST) Num writes in a month * 0.00000125 USD
            NonTransactionalWritePercent: parseInt(this.nonTransactionalWritePercent!.value?.toString() || ""),// % /100 = standard portion
            // number of writes x standard portion x 1 write request units for standard writes x 1 write request units needed per item =  write request units for standard writes
            TransactionalWritePercent: parseInt(this.transactionalWritePercent!.value?.toString() || ""), // % / 100 = transactional portion
            // number of writes x transactional portion x 2 write request units for transactional writes x 1 write request units needed per item =  write request units for transactional writes
            BaselineWriteRate: parseInt(this.baselineWriteRate!.value?.toString() || ""),
            BaselineWriteRateUnit: this.baselineWriteRateUnit!.value?.toString() || "",
            PeakWriteRate: parseInt(this.peakWriteRate!.value?.toString() || ""),
            PeakWriteRateUnit: this.peakWriteRateUnit!.value?.toString() || "",
            DurationPeakWrite: parseInt(this.durationPeakWrite!.value?.toString() || ""),
            DurationPeakWriteUnit: this.durationPeakWriteUnit!.value?.toString() || "",
            PercentBaselineWriteCovered: parseInt(this.percentBaselineWriteCovered!.value?.toString() || ""),
            WriteReservedTerm: parseInt(this.writeReservedTerm!.value?.toString() || ""),
            // write request units for standard writes +  write request units for transactional writes =  total write request units
            // cost: total write request units x 0.00000125 USD = 0.00 USD write request cost
        },
        Read :{
            EventuallyConsistentPercent: parseInt(this.eventuallyConsistentPercent!.value?.toString() || ""),
            StronglyConsistentPercent: parseInt(this.stronglyConsistentPercent!.value?.toString() || ""),
            TransactionPercent: parseInt(this.transactionPercent!.value?.toString() || ""),
            BaselineReadRate: parseInt(this.baselineReadRate!.value?.toString() || ""),
            BaselineReadUnit: this.baselineReadUnit!.value?.toString() || "",
            PeakReadRate: parseInt(this.peakReadRate!.value?.toString() || ""),
            PeakReadUnit: this.peakReadUnit!.value?.toString() || "",
            ReadPeakDuration: parseInt(this.readPeakDuration!.value?.toString() || ""),
            ReadPeakDurationUnit: this.readPeakDurationUnit!.value?.toString() || "",
            BaselinePercentRead: parseInt(this.baselinePercentRead!.value?.toString() || ""),
            ReadReservedCapacity: parseInt(this.readReservedCapacity!.value?.toString() || ""),
  
        }
      },
      pricing: costs
    }
    console.log("dynamo product:", dynamoProduct);
    //this.cfService.generateCloudFormationTemplate(formData); 
  //  console.log(this.cloudwatchForm.value)
    this.catalogService.add(dynamoProduct);
    this.dynamoForm.reset();

   }

   calculateCost(): { upfront: number, monthly: number, annual: number } {
    //Storage Size Unit GB or TB
    let storage = parseInt(this.storageSize!.value?.toString() || "");
    let storageCost = 0;
    //DATA
    if(this.storageSizeUnit!.value?.toString() === 'GB'){
      
      storageCost = storage * 0.25;
    }
    else{
      storageCost = storage * 256.0;
    }

    //WRITE
    let standardPercent = parseInt(this.nonTransactionalWritePercent!.value?.toString() || "");
    let transactionalPercent = parseInt(this.transactionalWritePercent!.value?.toString() || "");
    let standardWrites = standardPercent / 100;
    let transactionalWrites = transactionalPercent / 100;
    let numWrites = parseInt(this.baselineWriteRate!.value?.toString() || "") * 60 * 60 * 730; //num writes per month: 60 sec in a min. 60 min in hour, 730 hour in a month

    let standardWriteUnits = numWrites * standardWrites//write request units for standard writes
    let transactionalWriteUnits = numWrites * transactionalWrites * 2

    let totalWrites = standardWriteUnits + transactionalWriteUnits;
    let totalWriteMonthlyCost = totalWrites * 0.00000125;

    //READ
    let eventuallyPercent = parseInt(this.eventuallyConsistentPercent!.value?.toString() || "") / 100;
    let stronglyPercent = parseInt(this.stronglyConsistentPercent!.value?.toString() || "") / 100;
    let transactionPercent = parseInt(this.transactionPercent!.value?.toString() || "") / 100;
    let numReads = parseInt(this.baselineReadRate!.value?.toString() || "")* 60 * 60 * 730;

    let eventuallyReadUnits = numReads * eventuallyPercent * 0.5;
    let stronglyReadUnits = numReads * stronglyPercent;
    let transactionReadUnits = numReads * transactionPercent * 2

    let totalReads = eventuallyReadUnits + stronglyReadUnits + transactionReadUnits;
    let totalReadMonthlyCost = totalReads * 0.00000025;





    // Assuming monthly for now. Adjust as needed.
    const totalMonthlyCost = totalWriteMonthlyCost + totalReadMonthlyCost;
    return {
        upfront: 0, // Assuming no upfront costs
        monthly: totalMonthlyCost,
        annual: totalMonthlyCost * 12
    };
  }
}
