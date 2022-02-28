import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BASE_FUNCTION_URL,
  BASE_URL,
  INTERVIEW_URL,
  RECOMMENDED_QUESTIONS,
} from "app/shared/constants/endpoints-constants";
import { IInterView } from "app/shared/models/interview.interface";
import { Observable } from "rxjs";
import { IQuestionBankRequest } from "./questionBank-request.interface";

@Injectable({
  providedIn: "root",
})
export class InterviewService {
  constructor(private http: HttpClient) {}

  getRecommendedQuestions(param: IQuestionBankRequest): Observable<any> {
    return this.http.get(BASE_URL + RECOMMENDED_QUESTIONS);
  }

  submitInterviewFeedback(payload: IInterView): Observable<any> {
    return this.http.put(BASE_FUNCTION_URL + INTERVIEW_URL, payload);
  }
}
