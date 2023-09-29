import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CloudformApiRequest, CloudformApiResponse } from '../models/cloudformApi.model';
import { LoginService } from 'src/app/login/login.service';
import { AwsCatalogService } from 'src/app/aws-catalog/service/aws-catalog.service';

@Injectable({
  providedIn: 'root'
})
export class CloudformApiService {

  private endpoint: string = 'http://localhost:8080/cloud-template-s3'

  constructor(private httpClient: HttpClient,
              private loginService: LoginService,
              private catalog: AwsCatalogService) { }

  save(content: string, name: string) {
    const cart = this.catalog.getCart()
    const cfRequestPayload: CloudformApiRequest = {
      userId: this.loginService.CurrentUser.id,
      name: name,
      monthlyCost: Math.round(cart.reduce((prevResult, item) => prevResult + item.pricing?.monthly!, 0) * 100),
      cloudFormationJson: content
    }
    console.log(cfRequestPayload)
    this.httpClient
        .post<CloudformApiResponse>(this.endpoint,cfRequestPayload)
        .subscribe(res => {
          console.log(res)
        })
  }
}
