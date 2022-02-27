import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InventoryUploadService } from "app/inventory/inventory-upload.service";
import { UploadInventoryComponent } from "app/inventory/upload-inventory/upload-inventory.component";
import { JobService } from "app/job/job.service";

@Component({
  selector: "app-upload-candidate",
  templateUrl: "./upload-candidate.component.html",
  styleUrls: ["./upload-candidate.component.scss"],
})
export class UploadCandidateComponent implements OnInit {
  addCandidateForm: FormGroup;
  file: File = null;
  jobIds = [];
  jobsArray: JobDetails[] = [];
  changeDetectorRef: any;
  jobName: any;

  constructor(
    private uploadCandidateService: InventoryUploadService,
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
          this.jobIds.push(element.job.jbId);
          this.jobsArray.push(element.job);
        });
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }

  // getJobName() {
  //   this.addCandidateForm.controls.canaddJbId.valueChanges.subscribe(() => {
  //   this.changeDetectorRef.detectChanges();
  //   this.jobName = this.jobsArray.filter(id => {
  //     return id === this.jobsArray.filter();
  //   }).jbSkill;
  // });

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
