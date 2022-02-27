import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JobService } from "app/job/job.service";
import { UploadService } from "app/shared/services/upload.service";

@Component({
  selector: "app-upload-candidate",
  templateUrl: "./upload-candidate.component.html",
  styleUrls: ["./upload-candidate.component.scss"],
})
export class UploadCandidateComponent implements OnInit {
  addCandidateForm: FormGroup;
  file: File = null;
  jobsArray: JobDetails[] = [];

  constructor(
    private uploadCandidateService: UploadService,
    private getJobService: JobService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addCandidateForm = this.formBuilder.group({
      canaddJbId: [{ value: "", disabled: false }, Validators.required],
      canaddName: [{ value: "", disabled: false }, Validators.required],
      canaddEmail: [{ value: "", disabled: false }, Validators.required],
      canaddSkill: [{ value: "", disabled: false }, Validators.required],
      canaddQual: [null],
      canaddStatus: [null],
      canaddResumeDir: [null],
    });

    this.getJobService.getJobs().subscribe(
      (res) => {
        console.log("res ", res);
        res.forEach((element) => {
          this.jobsArray.push(element.job);
        });
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }

  onFilechange(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
    console.log("form status: ", this.addCandidateForm.status);
  }

  uploadCandidate() {
    if (this.file) {
      this.uploadCandidateService
        .uploadCandidateFile(this.addCandidateForm.value, this.file)
        .subscribe(
          (resp) => {
            alert("Candidate Uploaded");
          },
          (error) => {
            alert(error.error.message);
          }
        );
    } else {
      alert("Please select a resume first");
    }
  }
}
