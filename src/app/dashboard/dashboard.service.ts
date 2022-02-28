import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BASE_URL,
  DISPLAY_INV
} from "app/shared/constants/endpoints-constants";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private http: HttpClient) {}


  displayInv(): Observable<any> {
    return this.http.get(`${BASE_URL + DISPLAY_INV}`);
  }

  
}
