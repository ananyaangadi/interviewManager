import { Component, OnInit } from "@angular/core";
import { InventoryUploadService } from "../inventory-upload.service";

@Component({
  selector: "app-upload-inventory",
  templateUrl: "./upload-inventory.component.html",
  styleUrls: ["./upload-inventory.component.scss"],
})
export class UploadInventoryComponent {
  file: File = null;
  constructor(private inventoryService: InventoryUploadService) {}

  onFilechange(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  uploadInventory() {
    if (this.file) {
      this.inventoryService.uploadInventoryFile(this.file).subscribe((resp) => {
        alert("Inventory Uploaded");
      });
    } else {
      alert("Please select a file first");
    }
  }
}
