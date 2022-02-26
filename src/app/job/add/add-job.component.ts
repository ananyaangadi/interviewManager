import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ADD_JOB_SUCCESS } from "app/shared/constants/messages-constant";
import { ToastrService } from "ngx-toastr";
import { JobService } from "../job.service";
import { IAddJobRequest } from "./add-job-request.interface";

@Component({
  selector: "app-add-job",
  templateUrl: "./add-job.component.html",
  styleUrls: ["./add-job.component.scss"],
})
export class AddJobComponent implements OnInit {
  createJobForm: FormGroup = this.buildForm();
  constructor(
    private jobService: JobService,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {}

  buildForm(): FormGroup {
    return this.fb.group({
      title: [""],
      description: [""],
      hm: [""],
      hr: [""],
      department: [""],
      subDepartment: [""],
      designation: [""],
      minExperience: [0],
      maxExperience: [0],
      skills: [""],
      jobType: [""],
      qualification: [""],
      closingDate: [new Date()],
    });
  }

  get formControls() {
    return this.createJobForm.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    const req: IAddJobRequest = {
      closingDate: this.formControls["closingDate"].value,
      hmName: this.formControls["hm"].value,
      hrName: this.formControls["hr"].value,
      jobDept: this.formControls["department"].value,
      subDept: this.formControls["subDepartment"].value,
      jobDesignation: this.formControls["designation"].value,
      description: this.formControls["description"].value,
      jobMinExp: this.formControls["minExperience"].value,
      jobMaxExp: this.formControls["maxExperience"].value,
      jobSkill: this.formControls["skills"].value,
      jobType: this.formControls["jobType"].value,
      jobTitle: this.formControls["title"].value,
      postingDate: new Date(),
      qualification: this.formControls["qualification"].value,
    };

    if (this.createJobForm.valid) {
      this.addJob(req);
    }
  }

  addJob(addJobRequest: IAddJobRequest) {
    console.log(addJobRequest);
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
