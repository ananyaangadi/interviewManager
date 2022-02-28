import { Component, OnInit } from "@angular/core";
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
        console.log(res)
        this.questionBankList = res;
      },
      (err) => {
        this.toastr.error(err);
      }
    );
  }
}
