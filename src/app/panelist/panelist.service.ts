import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BASE_URL,
  GET_INT_URL
} from "app/shared/constants/endpoints-constants";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PanelistService {
  constructor(private http: HttpClient) {}


  getInterviews(): Observable<any> {
    return this.http.get(`${BASE_URL + GET_INT_URL}?pnlId=P34567`);
  }

}
