import { Injectable } from '@angular/core';
import { CreateServiceApi } from './create-service.api';
import { Router } from '@angular/router';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

//Local ENV Config
//Written By David Bowles

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
export class CreateServiceService {
    constructor(public api:CreateServiceApi, router: Router) {}

    _saveServiceError = ""
    _validImage = false
    _validTemplate = false
    _invalidTemplateMessage = "" 
    _response:any = ""
    _cloudFormationJson:any = {
      Resources: {}
    }

    get saveServiceError(){
      return this._saveServiceError
    }

    get validImage(){
      return this._validImage
    }

    get validTemplate(){
      return this._validTemplate
    }

    get invalidTemplateMessage(){
      return this._invalidTemplateMessage
    }

    get response(){
      return JSON.stringify(this._response)
    }

    get cloudFormationJson(){
      return this._cloudFormationJson
    }


    checkFile(newFile:any){
       //TODO: Add verification of file size


    }

    submitNewService(serviceObject: any, serviceName:string, serviceDescription:string, image:any){

      this._validTemplate = false
      this._invalidTemplateMessage = ""
      //TODO:FIX THIS STUPID CODE
      this.convertToCloudFormationTemplate(serviceObject)
      
      let requestBody = {
        cloudFormationJson : this.cloudFormationJson
      }
      console.log("Validate request body: " , JSON.stringify(requestBody))
      this.api.checkCloudFormationTemplate(requestBody)
      .subscribe(res => this.saveNewService(res, serviceName, serviceObject, serviceDescription, image))
    }

    saveNewService(response:any, serviceName:string ,serviceObject:any, serviceDiscription:string,  image:any){
      console.log(response)
      this._response = response
      if("errorMessage" in response){
        console.log("INVALID VALIDATE SAVE TEMPLATE")
        this._validTemplate = false
        this._invalidTemplateMessage = response.errorMessage
      }
      else{
        console.log("VALID VALIDATE SAVE TEMPLATE")
        this._validTemplate = true
      }
      if(this._validTemplate){
          let service = {
            serviceObject: {
              serviceName: serviceName,
              serviceDiscription: serviceDiscription,
              service:serviceObject
            }
          }
          this.api.saveService(service).subscribe(res=>this.saveImage(res, image))
      }
      else{
        this._saveServiceError = "Validation for Template Failed, Cannnot Save Service"
      }

      }

      async saveImage(response:any, image: any){
        if("errorMessage" in response){
          console.log("INVALID SAVE TEMPLATE")
          this._validTemplate = false
          this._invalidTemplateMessage = response.errorMessage
        }
        else{
          console.log("VALID SAVE TEMPLATE")
          this._validTemplate = true

        
          console.log("S3.PUTOBJECT")
          const command = new PutObjectCommand({
              Bucket: bucket,
              Key: response.id+".jpg",
              Body: image,
          });
          
          try {
              const response = await client.send(command);
              console.log(response);
          } catch (err) {
              console.error(err);
          }
          };
      }

        
      


    convertToCloudFormationTemplate(resources: any){

      for(let resource of resources){
      this._cloudFormationJson.Resources = {
      [resource.name] : {
        Type: resource.serviceType,
        Properties : this.getCloudTemplateProperties(resource.serviceParameters)
      }
      }
    }
      console.log(JSON.stringify(this.cloudFormationJson))
    }
  
    getCloudTemplateProperties(resource:any){
      let properties:any = {}
      for (let value of resource){
        if(value.type == "String"){
          properties[value.key] = value.defaultValue
        }
        if(value.type == "Integer"){
          properties[value.key] = value.defaultValue
        }
        if(value.type == "ValueList"){
          properties[value.key] = value.defaultValue
        }
        if(value.type == "Object"){
          properties[value.key] = this.getCloudTemplateProperties(value.defaultValue)
        }
        if(value.type == "Array"){
          properties[value.key] = [this.getCloudTemplateProperties(value.defaultValue)]
        }
      }
      return properties
    }

    checkTemplate(){
        let requestBody = {
          cloudFormationJson : this.cloudFormationJson
        }
        console.log("Validate request body: " , JSON.stringify(requestBody))
        this.api.checkCloudFormationTemplate(requestBody)
        .subscribe(res => this.processValidationMessage(res))      
    }

    processValidationMessage(res: any){
      console.log(res)
      this._response = res
      if("errorMessage" in res){
        console.log("INVALID TEMPLATE")
        this._validTemplate = false
        this._invalidTemplateMessage = res.errorMessage
      }
      else{
        console.log("VALID TEMPLATE")
        this._validTemplate = true
      }
    }
}