import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IInterviewFeedback } from "app/shared/models/interview-feedback.interface";

@Component({
  selector: "app-feed-back-preview",
  templateUrl: "./feed-back-preview.component.html",
})
export class FeedBackPreviewComponent {
  feedbackData: IInterviewFeedback[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: IInterviewFeedback[]) {
    this.feedbackData = data;
  }
}
