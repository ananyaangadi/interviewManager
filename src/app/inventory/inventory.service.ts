import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getJobs():Observable<any> {
    return this.http.get("https://msim-services.azurewebsites.net/getjob?hmhrId=P12345")
  }
}
