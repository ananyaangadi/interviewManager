import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BASE_URL,
  CREATE_JOB_URL,
  GET_JOB_URL,
  SCHEDULE_URL
} from "app/shared/constants/endpoints-constants";
import { Observable } from "rxjs";
import { IAddJobRequest } from "./add/add-job-request.interface";

@Injectable({
  providedIn: "root",
})
export class JobService {
  constructor(private http: HttpClient) {}

  addJob(payload: IAddJobRequest): Observable<any> {
    return this.http.post(BASE_URL + CREATE_JOB_URL, payload);
  }

  getJobs(): Observable<any> {
    return this.http.get(`${BASE_URL + GET_JOB_URL}?hmhrId=P12345`);
  }

  schedule(payload: any): Observable<any> {
    return this.http.put(SCHEDULE_URL, payload);
  }
}
