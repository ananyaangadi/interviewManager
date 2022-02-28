import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { IInterviewFeedback } from "app/shared/models/interview-feedback.interface";
import { IInterView } from "app/shared/models/interview.interface";
import { FeedBackPreviewService } from "app/shared/services/feed-back-preview.service";
import * as moment from "moment";
import { PanelistService } from "./panelist.service";

@Component({
  selector: "app-panelist",
  templateUrl: "./panelist.component.html",
  styleUrls: ["./panelist.component.css"],
})
export class PanelistComponent implements OnInit {
  upcomingInterviewColumns: string[] = [
    "id",
    "Candidate_Name",
    "Round",
    "Feedback",
    "Date",
    "start",
  ];

  pastInterviewColumns: string[] = [
    "id",
    "Candidate_Name",
    "Round",
    "Feedback",
    "Date",
  ];
  upcomingInterviewList: MatTableDataSource<IInterView>;
  pastInterviewList: MatTableDataSource<IInterView>;

  isPastSelected: boolean;
  upcomingList: IInterView[];
  pastList: IInterView[];

  constructor(
    private router: Router,
    private panelistService: PanelistService,
    private feedbackPreviewService: FeedBackPreviewService
  ) {}

  ngOnInit() {
    this.getInterviewList();
  }

  getInterviewList() {
    this.panelistService
      .getInterviewListByPanelId()
      .subscribe((res: IInterView[]) => {
        this.upcomingList = res.filter((interview: IInterView) =>
          moment(interview.intDate).isAfter(moment())
        );
        this.pastList = res.filter((interview: IInterView) =>
          moment(interview.intDate).isBefore(moment())
        );
        this.upcomingInterviewList = new MatTableDataSource(this.upcomingList);
        this.pastInterviewList = new MatTableDataSource(this.pastList);
      });
  }

  startInterview(data) {
    this.router.navigate(["inventory"]);
  }

  showCompleted() {
    this.isPastSelected = true;
  }

  showUpcoming() {
    this.isPastSelected = false;
  }

  viewFeedback(data: IInterView) {
    const feedBackPreview: IInterviewFeedback[] = data.intFeedback;
    this.feedbackPreviewService.openDialog(feedBackPreview);
  }
}
