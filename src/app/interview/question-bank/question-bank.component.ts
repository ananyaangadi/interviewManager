import { Component, Input, OnInit, Output } from "@angular/core";
import { IQuestionBank } from "../questionBank.interface";

@Component({
  selector: "app-question-bank",
  templateUrl: "./question-bank.component.html",
  styleUrls: ["./question-bank.component.scss"],
})
export class QuestionBankComponent implements OnInit {
  @Input() questionBankList: IQuestionBank[];
  constructor() {}

  ngOnInit(): void {}
}
