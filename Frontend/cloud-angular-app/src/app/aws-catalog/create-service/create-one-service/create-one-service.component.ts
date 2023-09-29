import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CreateServiceService } from '../service/create-service.service';

//Written By David Bowles
@Component({
  selector: 'app-create-one-service',
  templateUrl: './create-one-service.component.html',
  //styleUrls: ['./create-one-service.component.css']
})
export class CreateOneServiceComponent {
  name = 'Parameters';
  values:any = [];
  cloudFormationJson:any = {} 

  constructor(public service:CreateServiceService) {}


  @Output() 
  newItemEvent = new EventEmitter<any[]>();

  onChange(value:any){
    this.newItemEvent.emit(value)
  }

  addDefaultValue(i:number, value: any){
      this.values[i].defaultValue = value
  }

  removeParam(i:number){
    this.values.splice(i,1);
  }

  addParam(){
    this.values.push({
      key: "",
      hasQuestion: false,
      questionType: "String Input",
      question: null,
      type: "",
      defaultValue: []
  });
  }
}

					