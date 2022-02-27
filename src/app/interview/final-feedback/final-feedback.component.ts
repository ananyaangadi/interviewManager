import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IQuestionBank } from "../questionBank.interface";

@Component({
  selector: "app-final-feedback",
  templateUrl: "./final-feedback.component.html",
  styleUrls: ["./final-feedback.component.scss"],
})
export class FinalFeedbackComponent implements OnInit {
  @Input() answeredQuestions: IQuestionBank[];
  @Input() notQuestions: IQuestionBank[];
  feedbackForm: FormGroup = this.buildForm();
  constructor(private fb: FormBuilder) {}

  buildForm(): FormGroup {
    return this.fb.group({
      round: [""],
      technicalKnowledge: [""],
      understanding: [""],
      explainability: [""],
      recomendedForNextRound: ["no"],
      additionalComment: [""],
    });
  }

  ngOnInit(): void {}

  onSubmit() {}
}
