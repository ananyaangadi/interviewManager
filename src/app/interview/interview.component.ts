import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { INTERVIEW_SAVE_SUCCESS } from "app/shared/constants/messages-constant";
import { IInterviewFeedback } from "app/shared/models/interview-feedback.interface";
import { IInterView } from "app/shared/models/interview.interface";
import { ToastrService } from "ngx-toastr";
import { InterviewService } from "./interview.service";
import { IQuestionBank } from "./questionBank.interface";

@Component({
  selector: "app-interview",
  templateUrl: "./interview.component.html",
})
export class InterviewComponent {
  questionBankList: IQuestionBank[];
  answeredQuestion: string[];
  unAnsweredQuestion: string[];
  isInterviewExisted: boolean = false;
  constructor(
    private interviewService: InterviewService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  submitInterviewData(feedBackData: IInterviewFeedback) {
    const interviewData = this.interviewService.getInterview();
    let payload = Object.assign(interviewData);
    if (payload.intFeedback && typeof payload.intFeedback === "object") {
      payload.intFeedback = [...payload.intFeedback, feedBackData];
    } else {
      payload.intFeedback = feedBackData;
    }

    payload.intFeedback = JSON.stringify(payload.intFeedback);
    this.interviewService.submitInterviewFeedback(payload).subscribe(
      (res) => {
        this.toastr.success(INTERVIEW_SAVE_SUCCESS);
        this.isInterviewExisted = false;
        this.router.navigate(["interview"]);
      },
      (err) => {
        this.toastr.error(err);
      }
    );
  }

  onInterviewExit(data: { answeredList: string[]; unAnsweredList: string[] }) {
    this.isInterviewExisted = true;
    this.answeredQuestion = data.answeredList;
    this.unAnsweredQuestion = data.unAnsweredList;
  }
}
