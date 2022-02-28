import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRippleModule } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { StatsModule } from "app/stats/stats.module";
import { JobModule } from "../job/job.module";
import { PanelistComponent } from "./panelist.component";
import { UpcomingCardComponent } from "./upcoming-card/upcoming-card.component";
import { CompletedCardComponent } from "./completed-card/completed-card.component";
import { SharedModule } from "app/shared/shared.module";
import { MatPaginatorModule } from "@angular/material/paginator";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatCardModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    HttpClientModule,
    JobModule,
    MatTabsModule,
    StatsModule,
    SharedModule,
    MatPaginatorModule
  ],
  declarations: [
    PanelistComponent,
    UpcomingCardComponent,
    CompletedCardComponent,
  ],
  exports: [PanelistComponent],
})
export class PanelistModule {}
