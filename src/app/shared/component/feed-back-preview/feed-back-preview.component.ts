import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IInterviewFeedback } from "app/shared/models/interview-feedback.interface";

@Component({
  selector: "app-feed-back-preview",
  templateUrl: "./feed-back-preview.component.html",
})
export class FeedBackPreviewComponent {
  feedbackData: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any[]) {
    this.feedbackData = data[0];
    console.log("feeeeddback")
    console.log(data)
  }
}
