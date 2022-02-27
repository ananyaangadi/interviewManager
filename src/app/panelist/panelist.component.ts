import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";

const upcomingInterviews: any[] = [
  {
    id: 1,
    name: "Carl Sagan",
    round: "R1",
    date: "21st Feb 2022",
    time: "10:00 to 11:30",
  },
  {
    id: 2,
    name: "Albert Thompson",
    round: "R2",
    date: "1st March 2022",
    time: "15:30 to 16:45",
  },
  {
    id: 3,
    name: "Mark Jackson",
    round: "R1",
    date: "23st Feb 2021",
    time: "12:00 to 12:30",
  },
];

const pastInterviews: any[] = [
  {
    id: 1,
    name: "Kevin Holt",
    round: "R1",
    date: "15th Jan 2022",
    time: "10:00 to 11:30",
  },
  {
    id: 2,
    name: "Larissa Takchi",
    round: "R2",
    date: "1st Feb 2022",
    time: "15:30 to 16:45",
  },
  {
    id: 3,
    name: "Tessa Boersma",
    round: "R1",
    date: "23rd Dec 2021",
    time: "12:00 to 12:30",
  },
];

const initialSelection = [];
const allowMultiSelect = true;

@Component({
  selector: "app-panelist",
  templateUrl: "./panelist.component.html",
  styleUrls: ["./panelist.component.css"],
})
export class PanelistComponent implements OnInit {
  displayedColumns3: string[] = [
    "id",
    "Candidate_Name",
    "Round",
    "Date",
    "Time",
    "start",
  ];
  displayedColumns4: string[] = [
    "id",
    "Candidate_Name",
    "Round",
    "Date",
    "Time",
    "feedback",
  ];
  dataSource3: MatTableDataSource<any> = new MatTableDataSource(
    upcomingInterviews
  );
  dataSource4: MatTableDataSource<any> = new MatTableDataSource(pastInterviews);

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {}

  startInterview(data) {
    this.router.navigate(["inventory"]);
  }
}
