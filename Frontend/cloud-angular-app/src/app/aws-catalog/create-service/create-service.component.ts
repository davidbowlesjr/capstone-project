import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CreateServiceService } from './service/create-service.service';

//Written By David Bowles

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  //styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent {
  name = 'Parameters';
  serviceDescription = ""
  serviceName = ""
  _resources:any = [];
  cloudFormationJson:any = {} 
  file:any

  constructor(public service:CreateServiceService) {}

  serviceForm = new FormGroup({
    serviceName : new FormControl('', [
      Validators.required,
    ]),
    
    serviceDescription : new FormControl('',[
      Validators.required,
    ])
  });

  onFileSelected(event:any){
    console.log(event)
    this.service.checkFile(event.target.files[0])
    //TODO: Input File Validation
    if(true){
      this.file = event.target.files[0]
    }
  }

  validateCloudTemplate(){
    this.service.convertToCloudFormationTemplate(this._resources)
    this.service.checkTemplate()
  }

  submitService(){
    this.service.submitNewService(this._resources, this.serviceName, this.serviceDescription, this.file)
  }

  get resources(){
    return JSON.stringify(this._resources)
  }

  get cloudFormationString(){
    return JSON.stringify(this.cloudFormationJson)
  }

  addService(i:number, value: any){
      console.log("Add Default Value Hit: "+ JSON.stringify(value))
      this._resources[i].serviceParameters = value
  }

  removeParam(i:number){
    this._resources.splice(i,1);
  }

  addParam(){
    this._resources.push({
      name: "",
      serviceType: "",
      serviceParameters: []
  });
  }
}

					