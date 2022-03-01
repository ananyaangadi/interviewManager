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
  interviewData: IInterView;
  constructor(private http: HttpClient) {}

  getRecommendedQuestions(pnlId: string): Observable<any> {
    return this.http.get(
      "https://msim-services.azurewebsites.net/getRecommend?pnlId=" + pnlId
    );
  }

  setInterview(interview: IInterView) {
    this.interviewData = interview;
  }

  getInterview(): IInterView {
    return this.interviewData;
  }

  submitInterviewFeedback(payload: IInterView): Observable<any> {
    const req = {candidateId:payload.canId,round:payload.intRound,panelistId:payload.pnlId,feedback:payload.intFeedback}
    return this.http.post("https://msim-services.azurewebsites.net/saveFeedback",req);
  }
}
