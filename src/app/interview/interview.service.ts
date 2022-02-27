import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BASE_URL,
  RECOMMENDED_QUESTIONS,
} from "app/shared/constants/endpoints-constants";
import { Observable } from "rxjs";
import { IQuestionBankRequest } from "./questionBank-request.interface";
import { IQuestionBank } from "./questionBank.interface";

@Injectable({
  providedIn: "root",
})
export class InterviewService {
  constructor(private http: HttpClient) {}

  getRecommendedQuestions(param: IQuestionBankRequest): Observable<any> {
    return this.http.get(BASE_URL + RECOMMENDED_QUESTIONS);
  }
}
