import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JobService } from "app/job/job.service";
import { UploadService } from "app/shared/services/upload.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-upload-candidate",
  templateUrl: "./upload-candidate.component.html",
  styleUrls: ["./upload-candidate.component.scss"],
})
export class UploadCandidateComponent implements OnInit {
  addCandidateForm: FormGroup;
  file: File = null;
  jobsArray: JobDetails[] = [];
  resetFlag: boolean;
  @ViewChild("formFile") candidateFile: ElementRef;

  constructor(
    private uploadCandidateService: UploadService,
    private getJobService: JobService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService
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
    this.file = event.target.files[0];
  }

  uploadCandidate() {
    if (this.file) {
      this.uploadCandidateService
        .uploadCandidateFile(this.addCandidateForm.value, this.file)
        .subscribe(
          (resp) => {
            this.toasterService.success(
              "Candidate Uploaded, id: " + resp.canaddId
            );
            this.addCandidateForm.disable();
            this.resetFlag = true;
          },
          (error) => {
            this.toasterService.error(error.error.errMsg);
          }
        );
    } else {
      this.toasterService.error("Please select a resume first");
    }
  }

  resetForm() {
    this.addCandidateForm.reset();
    this.addCandidateForm.enable();
    this.candidateFile.nativeElement.value = "";
    this.file = null;
    this.resetFlag = false;
  }
}
