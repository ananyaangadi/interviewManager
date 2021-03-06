import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";
import { DashboardModule } from "../../dashboard/dashboard.module";
import { HttpClientJsonpModule } from "@angular/common/http";
import { JobModule } from "../../job/job.module";
import { PanelistModule } from "../../panelist/panelist.module";
import { StatsModule } from "../../stats/stats.module";

import { MatExpansionModule } from "@angular/material/expansion";
import { InventoryModule } from "app/inventory/inventory.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { CandidateModule } from "app/candidate/candidate.module";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    DashboardModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatTabsModule,
    HttpClientJsonpModule,
    JobModule,
    CandidateModule,
    InventoryModule,
    PanelistModule,
    StatsModule,
    MatPaginatorModule
  ],
  declarations: [DashboardComponent],
})
export class AdminLayoutModule {}
