import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IInterviewFeedback } from "app/shared/models/interview-feedback.interface";

@Component({
  selector: "app-final-feedback",
  templateUrl: "./final-feedback.component.html",
  styleUrls: ["./final-feedback.component.scss"],
})
export class FinalFeedbackComponent {
  @Input() answeredQuestions: string[];
  @Input() unAnsweredQuestions: string[];
  @Output() saveInterviewFeedBack: EventEmitter<IInterviewFeedback> =
    new EventEmitter<IInterviewFeedback>();

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

  get formControls() {
    return this.feedbackForm.controls;
  }

  onSubmit() {
    if (!this.feedbackForm.invalid) {
      const interviewFeedbackData: IInterviewFeedback = {
        answeredList: this.answeredQuestions,
        unansweredList: this.unAnsweredQuestions,
        round: this.formControls["round"].value,
        technicalKnowledge: this.formControls["technicalKnowledge"].value,
        understanding: this.formControls["understanding"].value,
        explainability: this.formControls["explainability"].value,
        recommendedForNextRound:
          this.formControls["recomendedForNextRound"].value,
        comment: this.formControls["additionalComment"].value,
      };

      this.saveInterviewFeedBack.emit();
    }
  }
}
