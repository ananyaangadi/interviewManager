import { Component, OnInit } from "@angular/core";
import { ADD_JOB_SUCCESS } from "app/shared/constants/messages-conatsnt";
import { ToastrService } from "ngx-toastr";
import { JobService } from "../job.service";
import { IAddJobRequest } from "./add-job-request.interface";

@Component({
  selector: "app-create-job",
  templateUrl: "./add-job.component.html",
  styleUrls: ["./add-job.component.scss"],
})
export class AddJobComponent implements OnInit {
  constructor(private jobService: JobService, private toast: ToastrService) {}

  ngOnInit(): void {}

  addJob() {
    const addJobRequest: IAddJobRequest = {
      jobId: "",
      jdPath: "",
    };

    this.jobService.addJob(addJobRequest).subscribe(
      (res) => {
        this.toast.success(ADD_JOB_SUCCESS);
      },
      (err) => {
        this.toast.error(err);
      }
    );
  }
}
