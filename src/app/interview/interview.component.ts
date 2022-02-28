import { Component, OnInit } from "@angular/core";
import { INTERVIEW_SAVE_SUCCESS } from "app/shared/constants/messages-constant";
import { IInterviewFeedback } from "app/shared/models/interview-feedback.interface";
import { IInterView } from "app/shared/models/interview.interface";
import { ToastrService } from "ngx-toastr";
import { InterviewService } from "./interview.service";
import { IQuestionBankRequest } from "./questionBank-request.interface";
import { IQuestionBank } from "./questionBank.interface";

@Component({
  selector: "app-interview",
  templateUrl: "./interview.component.html",
})
export class InterviewComponent implements OnInit {
  questionBankList: IQuestionBank[];
  interviewData: IInterView;
  constructor(
    private interviewService: InterviewService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  getQuestionBank() {
    const req: IQuestionBankRequest = {
      pnlId: "P34570",
    };
    this.interviewService.getRecommendedQuestions(req).subscribe(
      (res: IQuestionBank[]) => {
        this.questionBankList = res;
      },
      (err) => {
        this.toastr.error(err);
      }
    );
  }

  submitInterviewData(feedBackData: IInterviewFeedback) {
    let payload = Object.assign(this.interviewData);
    payload.intFeedback = feedBackData;

    this.interviewService.submitInterviewFeedback(payload).subscribe(
      (res) => {
        this.toastr.success(INTERVIEW_SAVE_SUCCESS);
      },
      (err) => {
        this.toastr.error(err);
      }
    );
  }
}
