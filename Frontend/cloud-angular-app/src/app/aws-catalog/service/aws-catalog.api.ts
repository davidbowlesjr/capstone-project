import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"; 

//Written By David Bowles

@Injectable({
  providedIn: 'root'
})
export class AWSCatalogAPI {
    apiUrl = "https://8yskqsdgyf.execute-api.us-east-2.amazonaws.com/dev"

    constructor(private httpClient : HttpClient){
    }

    getServices(){
        return this.httpClient.get<any>(this.apiUrl+"/service")
    }
}