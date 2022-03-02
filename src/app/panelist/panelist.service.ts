import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  BASE_URL,
  DISPLAY_INV,
  GET_JOB_URL
} from "app/shared/constants/endpoints-constants";
@Injectable({
  providedIn: "root",
})
export class PanelistService {
  constructor(private http: HttpClient) {}

  getInterviewListByPanelId(): Observable<any> {
    return this.http.get(
      "https://msim-function-app.azurewebsites.net/api/ImInt"
    );
  }

  displayInv(): Observable<any> {
    return this.http.get(`${BASE_URL + DISPLAY_INV}`);
  }

  getJobs(): Observable<any> {
    return this.http.get(`${BASE_URL + GET_JOB_URL}?hmhrId=P12345`);
  }
}
