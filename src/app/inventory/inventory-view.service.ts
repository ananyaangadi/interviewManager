import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BASE_URL,
  RECOMMENDED_QUESTIONS,
} from "app/shared/constants/endpoints-constants";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InventoryViewService {
  constructor(private http: HttpClient) {}

  getRecommendedQuestions(param: any): Observable<any> {
    return this.http.get("https://msim-services.azurewebsites.net/getRecommend?pnlId=P34570");
  }
}
