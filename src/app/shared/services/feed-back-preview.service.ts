import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FeedBackPreviewComponent } from "../component/feed-back-preview/feed-back-preview.component";
import { IInterviewFeedback } from "../models/interview-feedback.interface";

@Injectable({
  providedIn: "root",
})
export class FeedBackPreviewService {
  constructor(public dialog: MatDialog) {}

  openDialog(fb?: IInterviewFeedback[]) {
    this.dialog.open(FeedBackPreviewComponent, {
      data: fb,
      width: "70vw",
      maxHeight: "90vh",
    });
  }
}
