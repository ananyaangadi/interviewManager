import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { StatsService } from "./stats.service";

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.css"],
})
export class StatsComponent implements OnInit {
  stats = {
    openPositions: 0,
    noOfHires: 0,
    pendingInterviews: 0,
  };
  data = ["y", "c"];
  constructor(
    private statService: StatsService,
    private toastr: ToastrService
  ) {}
  async ngOnInit() {
    this.getStats();
    this.getPendingInterviewCount();
  }

  getStats() {
    this.statService.getjobCount(this.data).subscribe(
      (res: { TotalCount: number }[]) => {
        this.stats.openPositions = res[0].TotalCount;
        this.stats.noOfHires = res[1].TotalCount;
      },
      (err) => {
        this.toastr.error(err);
      }
    );
  }

  getPendingInterviewCount() {
    this.statService.getPendingInterviewCount().subscribe(
      (res: { intCount: string }[]) => {
        this.stats.pendingInterviews = Number(res[0].intCount);
      },
      (err) => {
        this.toastr.error(err);
      }
    );
  }
}
