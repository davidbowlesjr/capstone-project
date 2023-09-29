import { Injectable } from '@angular/core';
import { DyanmicServiceApi } from './dynamic-service.api';

//Written By David Bowles

@Injectable({
  providedIn: 'root'
})
export class DynamicServiceService {
    _serviceId = ""
    _serviceObject:any = {}
    _serviceName = ""
    _serviceDescription = ""
    _rescoucesWtihQuestions=[{
    }]
    _cloudFormationJson:any = {
        Resources: {}
    }
    
    constructor(public api:DyanmicServiceApi){}


    // After CloudFormationJson is created when it is turned into a string some reformatting needs to be done
    formatCloudFormationString(cloudFormationString:string):string{
        console.log("STRING Start:",cloudFormationString)
        console.log("STRING Start:",cloudFormationString.indexOf('"":'))

        if(cloudFormationString.indexOf('"":') !== -1){
        let index = cloudFormationString.indexOf('"":')
        cloudFormationString = cloudFormationString.replace('"":', '')

        let bracketNum = 0
        for(let i = index-3 ; i < cloudFormationString.length; i++){
            if(cloudFormationString.charAt(i)==='{'){
                console.log("FOUND { Character")
                if(bracketNum == 0){
                    cloudFormationString = cloudFormationString.substring(0, i) + cloudFormationString.substring(i+1)
                }
                bracketNum++
            }

            if(cloudFormationString.charAt(i)==='}'){
                if(bracketNum == 1){
                    cloudFormationString = cloudFormationString.substring(0, i) + cloudFormationString.substring(i+1)
                    break
                }
                bracketNum--
            }
        }
        console.log("STRING AFTER FORMAT:",cloudFormationString)
        return this.formatCloudFormationString(cloudFormationString)
        }
        else{
        console.log("STRING END:",cloudFormationString)
        return cloudFormationString
        }
    }

    formatRescoucesWtihQuestionsToCloudTemplate(){
       return this.setDefaultValueToUserInput(
            this._serviceObject
        )
    }

    setDefaultValueToUserInput(serviceObject:any){
        return this.convertToCloudFormationTemplate(this.formatDefaultValueToUserInput(this._serviceObject))
    }

    formatDefaultValueToUserInput(serviceObject:any){
        for(let service of serviceObject){
            
            service.serviceParameters = this.formatDefaultValueObjectToUserInput(service.serviceParameters)  

        }
        return serviceObject
    }

    formatDefaultValueObjectToUserInput(serviceDefaultValue:any){
        
        for(let serviceValue of serviceDefaultValue){
        
            if(serviceValue.type ==='Array'||serviceValue.type === 'Object'){
                serviceValue.defaultValue = this.formatDefaultValueObjectToUserInput(serviceValue.defaultValue)
            }
            else{
            
                let newDefaultValue = this.checkForQuestion(serviceValue.question)
                if(newDefaultValue){
                    serviceValue.defaultValue = newDefaultValue
                    
                }
                else{
                    console.error("Question: ", serviceValue.question ," Not Found")
                }        
            }
        }
        return serviceDefaultValue
    }

    checkForQuestion(question: any) {
        let newDefaultValue = ""
        for(let rescouce of this.rescoucesWtihQuestions){
            for(let rescouceParam of rescouce.rescourceParams){
                if(question === rescouceParam.question){
                    newDefaultValue = rescouceParam.userInput
                }
            }
        }
        return newDefaultValue
    }

    convertToCloudFormationTemplate(resources: any){
        let cloudFormationJson = {
            
        }
  
        for(let resource of resources){
            cloudFormationJson = {...cloudFormationJson,
                [resource.name] : {
                  Type: resource.serviceType,
                  Properties : this.getCloudTemplateProperties(resource.serviceParameters)
                },
                }
        }
        return cloudFormationJson
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

    formatResouceWithQuestions(serviceObject:any){
        let newRescourcesWithQuestions = [] 
        for(let service of serviceObject){
            newRescourcesWithQuestions.push({
                rescourceName: service.name,
                rescourceParams: this.formatQuestions(service.serviceParameters)
            })     
        }
        this.rescoucesWtihQuestions = newRescourcesWithQuestions
    }

    formatQuestions(serviceParams:any){
        let questionArray:any[] = []
        for (let serviceParam of serviceParams){

            if(serviceParam.type ==='Array'||serviceParam.type === 'Object'){
                questionArray.push.apply(questionArray, this.formatObjectOrArrayParam(serviceParam, questionArray))
            }
            else{
            questionArray.push({
                hasQuestion: serviceParam.hasQuestion,
                type:  serviceParam.type,
                questionType: serviceParam.questionType,
                question: serviceParam.question,
                defaultValue: serviceParam.defaultValue,
                userInput:""

            })
        }
        }
        return questionArray
    }

    formatObjectOrArrayParam(serviceParams:any, questionArray:any[]): any[]{
        serviceParams = serviceParams.defaultValue

        for(let serviceParam of serviceParams){
            if(serviceParam.type ==='Array'||serviceParam.type === 'Object'){
                questionArray.push.apply(questionArray, this.formatObjectOrArrayParam(serviceParam, questionArray))
            }
            else{
                questionArray.push({
                    hasQuestion: serviceParam.hasQuestion,
                    type:  serviceParam.type,
                    questionType: serviceParam.questionType,
                    question: serviceParam.question,
                    defaultValue: serviceParam.defaultValue,
                    userInput: ""
    
                })
            }
        }

        return []
    }

    async getServiceObject(idObject:any){
        this.api.getServiceById(
            idObject
        ).subscribe(res => this.convertResponseToServiceObject(res))
    }


    convertResponseToServiceObject(response:any){
        console.log(JSON.stringify(response))
        let newServiceId = response.body.Item.id
        let newServiceObject = response.body.Item.serviceObject.serviceObject.service
        let newServiceName = response.body.Item.serviceObject.serviceObject.serviceName
        let newServiceDescription = response.body.Item.serviceObject.serviceObject.serviceDiscription

        if(newServiceId){
            this.serviceId = newServiceId
        }
        else{
            console.error("Error Processing Dynamically Created Service Id")
        }

        if(newServiceObject){
            this.serviceObject = newServiceObject
            this.formatResouceWithQuestions(this.serviceObject)
        }
        else{
            console.error("Error Processing Dynamically Created Service Object")
        }

        if(newServiceName){
            this.serviceName = newServiceName
        }
        else{
            console.error("Error Processing Dynamically Created Service Name")
        }

        if(newServiceDescription){
            this.serviceDescription = newServiceDescription
        }
        else{
            console.error("Error Processing Dynamically Created Service Description")
        }

        console.log(this.serviceObject)
    }

    set serviceId(serviceId:any){
        this._serviceId = serviceId
    }

    get serviceId(){
        return this._serviceId
    }

    set serviceName(serviceObject:any){
        this._serviceName = serviceObject
    }

    get serviceName(){
        return this._serviceName
    }

    set serviceDescription(serviceDescription:any){
        this._serviceDescription = serviceDescription
    }

    get serviceDescription(){
        return this._serviceDescription
    }

    set serviceObject(serviceObject:any){
        this._serviceObject = serviceObject
    }

    get serviceObject(){
        return this._serviceObject
    }

    set rescoucesWtihQuestions(rescoucesWtihQuestions:any){
        this._rescoucesWtihQuestions = rescoucesWtihQuestions
    }

    get rescoucesWtihQuestions(){
        return this._rescoucesWtihQuestions
    }

    get rescoucesWtihQuestionsAsString(){
        return JSON.stringify(this._rescoucesWtihQuestions)
    }
}


