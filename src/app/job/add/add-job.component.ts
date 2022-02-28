import { DatePipe } from "@angular/common";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UploadService } from "app/shared/services/upload.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-job",
  templateUrl: "./add-job.component.html",
  styleUrls: ["./add-job.component.scss"],
})
export class AddJobComponent {
  addJobForm: FormGroup;
  file: File = null;
  minDate: string;
  jobTypes = ["F", "P"];
  resetFlag: boolean;
  format = "MM/dd/yyyy";
  @ViewChild("formFile") jobFile: ElementRef;

  constructor(
    private uploadCandidateService: UploadService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private toasterService: ToastrService
  ) {
    this.minDate = this.datePipe.transform(new Date(), this.format);
  }

  ngOnInit(): void {
    this.addJobForm = this.formBuilder.group({
      jbId: [null],
      jbHrId: [null],
      jbHmId: [null],
      jbHrName: [{ value: "", disabled: false }, Validators.required],
      jbHmName: [{ value: "", disabled: false }, Validators.required],
      jbDesig: [{ value: "", disabled: false }, Validators.required],
      jbMinExp: [{ value: "", disabled: false }, Validators.required],
      jbMaxExp: [{ value: "", disabled: false }, Validators.required],
      jbTyp: [{ value: "", disabled: false }, Validators.required],
      jbDept: [{ value: "", disabled: false }, Validators.required],
      jbSubDept: [{ value: "", disabled: false }, Validators.required],
      jbSkill: [{ value: "", disabled: false }, Validators.required],
      jbQual: [{ value: "", disabled: false }, Validators.required],
      jbPostDate: [null],
      jbStatus: [null],
      jbDir: [null],
      jbCloseDate: [{ value: "", disabled: false }, Validators.required],
    });
  }

  onFilechange(event: any) {
    this.file = event.target.files[0];
  }

  uploadJob() {
    this.addJobForm.controls["jbCloseDate"].setValue(
      this.datePipe.transform(
        new Date(this.addJobForm.getRawValue().jbCloseDate),
        this.format
      )
    );
    this.addJobForm.controls["jbPostDate"].setValue(
      this.datePipe.transform(new Date(), this.format)
    );
    if (this.file) {
      this.uploadCandidateService
        .uploadJobFile(this.addJobForm.value, this.file)
        .subscribe(
          (resp) => {
            this.toasterService.success("Job Uploaded, id: " + resp.jbId);
            this.addJobForm.disable();
            this.resetFlag = true;
          },
          (error) => {
            this.toasterService.error(error.error.errMsg);
          }
        );
    } else {
      this.toasterService.error("Please select a JD first");
    }
  }

  resetForm() {
    this.addJobForm.reset();
    this.addJobForm.enable();
    this.jobFile.nativeElement.value = "";
    this.file = null;
    this.resetFlag = false;
  }
}
