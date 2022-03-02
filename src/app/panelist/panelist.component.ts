import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { InterviewService } from "app/interview/interview.service";
import { IInterviewFeedback } from "app/shared/models/interview-feedback.interface";
import { IInterView } from "app/shared/models/interview.interface";
import { FeedBackPreviewService } from "app/shared/services/feed-back-preview.service";
import * as moment from "moment";
import { PanelistService } from "./panelist.service";
import { ToastrService } from "ngx-toastr";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-panelist",
  templateUrl: "./panelist.component.html",
  styleUrls: ["./panelist.component.css"],
})
export class PanelistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
  displayInv: boolean = false;
  questionbank = [];
  dataSource3: MatTableDataSource<any>;
  feedbacks = {}

  /* display Inventory */

  displayedColumns3: string[] = [
    "id",
    "topic",
    "diflevel",
    "minexp",
    "question",
    "expectedans",
  ];

  constructor(
    private router: Router,
    private panelistService: PanelistService,
    private feedbackPreviewService: FeedBackPreviewService,
    private interviewService: InterviewService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.getInterviewList();

    this.panelistService.getJobs().subscribe(
      (res) => {
        res.forEach((element) => {


          element.canDetList.forEach(can => {
            var temp = []
            can.intDetList.forEach(round => {
              temp.push(round.intFeedback)
            });
            this.feedbacks[can.can.canId] = temp
          });
          
        });
        console.log(this.feedbacks)
      },
      (error) => {}
    );
  }

  ngAfterViewInit() {
    this.dataSource3.paginator = this.paginator;
  }

  getInterviewList() {
    this.panelistService
      .getInterviewListByPanelId()
      .subscribe((res: IInterView[]) => {
        res = res.map((int) => this.parseFeedbackData(int)); // deserialise json

        this.upcomingList = res.filter((interview: IInterView) =>
          moment(interview.intDate).isAfter(new Date())
        );
        this.pastList = res.filter((interview: IInterView) =>
          moment(interview.intDate).isBefore(new Date())
        );
        this.upcomingInterviewList = new MatTableDataSource(this.upcomingList);
        this.pastInterviewList = new MatTableDataSource(this.pastList);
      });
  }

  parseFeedbackData(interview: IInterView): IInterView {
    const feedbackData = interview.intFeedback;
    if (this.IsJsonString(feedbackData)) {
      interview.intFeedback = JSON.parse(interview.intFeedback as string);
    } else {
      interview.intFeedback = [];
    }

    return interview;
  }

  IsJsonString(str): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  startInterview(data) {
    this.interviewService.setInterview(data);
    this.router.navigate(["interview"]);
  }

  showCompleted() {
    this.isPastSelected = true;
  }

  showUpcoming() {
    this.isPastSelected = false;
  }

  viewFeedback(data) {
    console.log(data)
    var fb = this.feedbacks[data.canId]
    console.log(fb)
    var feedback:IInterviewFeedback[] = []
    fb.forEach(element => {
      if (element != "" && element !=null) 
      {
      console.log(element)
      feedback.push(JSON.parse(element))
      }
    });
    console.log("view feedback")
    console.log(feedback)
    // const feedBackPreview: IInterviewFeedback[] =
    //   data.intFeedback as IInterviewFeedback[];
    this.feedbackPreviewService.openDialog(feedback);
  }

  displayInventory() {
    this.panelistService.displayInv().subscribe(
      (res) => {
        var temp = [];
        res.forEach((element) => {
          var temp1 = {
            id: element.imKbId,
            topic: element.imKbTopic,
            subtopic: element.imKbSubTopic,
            diflevel: element.imKbDifLevel,
            minexp: element.imKbMinExp,
            maxexp: element.imKbMaxExp,
            question: element.imKbQues,
            expectedans: element.imKbSolu,
          };
          temp.push(temp1);
        });
        this.questionbank = temp;
        this.dataSource3 = new MatTableDataSource(this.questionbank);
        this.dataSource3.paginator = this.paginator;
        console.log(res);
        // this.toast.success();
      },
      (err) => {
        this.toast.error(err);
      }
    );
  }
}
