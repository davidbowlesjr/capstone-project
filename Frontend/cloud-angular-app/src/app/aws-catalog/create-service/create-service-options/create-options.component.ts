import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CreateServiceService } from '../service/create-service.service';

//Written By David Bowles
@Component({
  selector: 'app-create-options',
  templateUrl: './create-options.component.html',
 // styleUrls: ['./create-options.component.css']
})
export class CreateOptionsComponent {
  name = 'Parameters';
  values:any = [];
  cloudFormationJson:any = {} 

  constructor(public service:CreateServiceService) {}


  @Output() 
  answerValues = new EventEmitter<any[]>();

  onChange(value:any){
    this.answerValues.emit(this.values)
  }

  addDefaultValue(i:number, value: any){
      this.values[i].defaultValue = value
  }

  removeParam(i:number){
    this.values.splice(i,1);
  }

  addParam(){
    this.values.push({
      inputValue: "",
  });
  }
}

					