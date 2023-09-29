import { HttpClient } from "@angular/common/http"; 
import { Injectable } from '@angular/core';

//Written By David Bowles

@Injectable({
  providedIn: 'root'
})
export class CreateServiceApi {

    apiUrl = "https://8yskqsdgyf.execute-api.us-east-2.amazonaws.com/dev"


    constructor(private httpClient : HttpClient){

    }

    checkCloudFormationTemplate(cloudTemplate:any){
        return this.httpClient.post<any>(this.apiUrl+"/validate-template", cloudTemplate)
    }

    saveService(serviceObject: any){
        return this.httpClient.post<any>(this.apiUrl+"/service", serviceObject)
    }
}
