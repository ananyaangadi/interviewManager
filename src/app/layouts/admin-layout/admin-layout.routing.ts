import { Routes } from "@angular/router";
import { PanelistComponent } from "app/panelist/panelist.component";

import { DashboardComponent } from "../../dashboard/dashboard.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "panelist", component: PanelistComponent },
];
