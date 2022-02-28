import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { UploadService } from "app/shared/services/upload.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-upload-inventory",
  templateUrl: "./upload-inventory.component.html",
  styleUrls: ["./upload-inventory.component.scss"],
})
export class UploadInventoryComponent {
  file: File = null;
  @ViewChild("formFile") inventoryFile: ElementRef;
  disableFlag: boolean;

  constructor(
    private inventoryService: UploadService,
    private toasterService: ToastrService
  ) {}

  onFilechange(event: any) {
    this.file = event.target.files[0];
  }

  uploadInventory() {
    if (this.file) {
      this.inventoryService.uploadInventoryFile(this.file).subscribe(
        (resp) => {
          this.toasterService.success("Inventory Uploaded");
          this.disableFlag = true;
        },
        (error) => {
          this.toasterService.error("Upload failed, please try after sometime");
        }
      );
    } else {
      this.toasterService.error("Please select a file first");
    }
  }

  resetForm() {
    this.inventoryFile.nativeElement.value = "";
    this.file = null;
    this.disableFlag = false;
  }
}
