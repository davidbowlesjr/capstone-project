import { HttpClient } from "@angular/common/http"; 
import { Injectable } from '@angular/core';

//Written By David Bowles

@Injectable({
  providedIn: 'root'
})
export class DyanmicServiceApi {

    apiUrl = "https://8yskqsdgyf.execute-api.us-east-2.amazonaws.com/dev"


    constructor(private httpClient : HttpClient){

    }

    checkCloudFormationTemplate(cloudTemplate:any){
        return this.httpClient.post<any>(this.apiUrl+"/validate-template", cloudTemplate)
    }

    getServiceById(idRequest: any){
        console.log("ID REQUEST: ", idRequest)
        return this.httpClient.get<any>(this.apiUrl+"/service?id="+idRequest.id)
    }
}