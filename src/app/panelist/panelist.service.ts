import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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
}
