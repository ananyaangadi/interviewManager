import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BASE_FUNCTION_URL,
  BASE_URL,
  DISPLAY_INV,
  GET_JOB_URL,
  INTERVIEW_COUNT,
  INTERVIEW_URL,
} from "app/shared/constants/endpoints-constants";
import { PNL_ID } from "app/shared/constants/messages-constant";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class PanelistService {
  constructor(private http: HttpClient) {}

  getInterviewCount(pnlId: string): Observable<any> {
    return this.http.get(`${BASE_URL}${INTERVIEW_COUNT}?pnlId=${pnlId}`);
  }

  getInterviewListByPanelId(): Observable<any> {
    return this.http.get(`${BASE_FUNCTION_URL}${INTERVIEW_URL}`);
  }

  displayInv(): Observable<any> {
    return this.http.get(`${BASE_URL + DISPLAY_INV}`);
  }

  getJobs(): Observable<any> {
    return this.http.get(`${BASE_URL + GET_JOB_URL}?hmhrId=P12345`);
  }
}
