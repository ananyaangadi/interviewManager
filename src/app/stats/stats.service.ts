import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BASE_FUNCTION_URL,
  JOB_COUNT,
} from "app/shared/constants/endpoints-constants";
import { forkJoin, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StatsService {
  constructor(private http: HttpClient) {}

  getjobCount(params: string[]): Observable<any> {
    const apiCollection = params.map((query) =>
      this.http.get(`${BASE_FUNCTION_URL}${JOB_COUNT}?jobStatus=${query}`)
    );
    return forkJoin(apiCollection);
  }
}
