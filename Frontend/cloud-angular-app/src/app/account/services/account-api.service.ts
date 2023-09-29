import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTemplate } from '../models/user-template.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  private endpoint: string = environment.apiURL + '/cloud-template-s3'

  constructor(private httpClient: HttpClient) { }

  getTemplates(id: number): Observable<UserTemplate[]> {
    return this.httpClient
               .get<UserTemplate[]>(`${this.endpoint}?userId=${id}`)
  }

}
