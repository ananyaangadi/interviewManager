import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { InterviewComponent } from "./interview/interview.component";
import { ViewInventoryComponent } from "./inventory/view-inventory/view-inventory.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent,
    pathMatch: "full",
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/admin-layout/admin-layout.module").then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: "interview",
    component: InterviewComponent,
  },
  {
    path: "inventory",
    component: ViewInventoryComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
