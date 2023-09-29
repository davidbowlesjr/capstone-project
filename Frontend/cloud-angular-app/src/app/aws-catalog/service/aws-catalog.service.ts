import { Injectable } from '@angular/core';
import { AWSProduct } from '../models/aws-product.model';
import { PutObjectCommand, S3Client , ListObjectsV2Command} from "@aws-sdk/client-s3";
import { interval, lastValueFrom } from 'rxjs';
import { AWSCatalogAPI } from './aws-catalog.api';
import { DynamicService } from '../models/dynamic-service.model';

//Local ENV Config

//Written By David Bowles and others


const AccessKeyId = "AKIAXZGJ4UHY3AFSGIEN",
      SecretKey = "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"

const creds = {
    accessKeyId: AccessKeyId,
    secretAccessKey: SecretKey,
};

const client = new S3Client({
  region: "us-east-2",
  credentials: creds
});

const bucket = "capstone-service-image"

@Injectable({
  providedIn: 'root'
})


export class AwsCatalogService {

  serviceCatologObjects: DynamicService[]= []
  serviceImageBucketUrl = "https://capstone-service-image.s3.us-east-2.amazonaws.com/"

  private cart : AWSProduct[] = []
  serviceCatalogObjects!: any[];
routerLink: string|any[]|null|undefined;

  constructor(public api:AWSCatalogAPI) {}

  getCart(): AWSProduct[] {
    return [...this.cart]
  }

  getServiceNames(): string[] {
    return this.cart.map(product => product.name).filter(name => name !== undefined) as string[];
  }
  
  add(product: AWSProduct) {
    const maxProductId: number = this.cart.reduce((prevResult, product) => product.id > prevResult ? product.id : prevResult, 0)
    const newProductId: number = maxProductId + 1;
    product.id = newProductId
    this.cart.push(product)
  }

  loadDynamicServices(){
    let serviceObjects = this.loadServiceObjects()
  }

  async loadServiceObjects(){
    let serviceObjects = await lastValueFrom(this.api.getServices())

    //Null Check
    if(serviceObjects.body.Items){
      serviceObjects = serviceObjects.body.Items
      if(serviceObjects.length){
        console.log("Service Objects ",serviceObjects)
        let s3Keys = (await this.getS3Keys()).sort()
        console.log("S3 Bucket IDs: ",JSON.stringify(s3Keys))


      console.log("Verified S3 Keys", s3Keys)
      this.serviceCatologObjects = []
      for (let serviceObject of serviceObjects){
        //TODO: FIX FORMATTING of DynamoDB Table
        console.log(serviceObject)
        console.log("serviceObject: " ,JSON.stringify(serviceObject.serviceObject.serviceObject))
        console.log("serviceDiscription: " ,JSON.stringify(serviceObject.serviceObject.serviceDiscription))
        let verifiedS3Key:string = "//:0"

        if(s3Keys){
          for (let s3Key of s3Keys){
            if(serviceObject.id === s3Key?.replace(".jpg","")){
              verifiedS3Key = s3Key!
            }
          }
          console.log("verifiedS3Key: ", verifiedS3Key)
        }

        if(verifiedS3Key){
          verifiedS3Key = this.serviceImageBucketUrl + verifiedS3Key
        }

        if(typeof serviceObject.id !== 'undefined' && typeof serviceObject.serviceObject.serviceObject.serviceName !== 'undefined' 
        && typeof serviceObject.serviceObject.serviceObject.serviceDiscription !== 'undefined' && typeof verifiedS3Key !== 'undefined'){
        this.serviceCatologObjects.push({
          id: serviceObject.id,
          name: serviceObject.serviceObject.serviceObject.serviceName,
          description: serviceObject.serviceObject.serviceObject.serviceDiscription,
          s3ImageUrl: verifiedS3Key,
          filterTags: [], 
          functionType: '',
          routerLink: ''
        })
      }
      }

      console.log("serviceCatologObjects: " ,this.serviceCatologObjects)
      }
      else{
        console.error("No Dynamicly Created Services Were Found")
      }  
    }
    else{
      console.error("Formatting error in loadServiceObjects")
    }
}

  

  async getS3Keys(){

    //TODO: Exception Handaling

    const listCommand = new ListObjectsV2Command({
        Bucket:bucket
    });

    let keys = []

    let listResponse = await client.send(listCommand)
    if(listResponse.Contents){
      for (let content of listResponse.Contents){
        keys.push(content.Key)
      }
    }

    return keys
  }

}

