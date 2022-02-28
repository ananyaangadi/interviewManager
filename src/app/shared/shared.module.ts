import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { FeedBackPreviewComponent } from "./component/feed-back-preview/feed-back-preview.component";
import { FeedBackPreviewService } from "./services/feed-back-preview.service";

@NgModule({
  declarations: [FeedBackPreviewComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [CommonModule, MatDialogModule],
  providers: [FeedBackPreviewService],
})
export class SharedModule {}
