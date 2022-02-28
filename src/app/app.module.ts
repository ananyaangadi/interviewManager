import { AgmCoreModule } from "@agm/core";
import { CdkTableModule } from "@angular/cdk/table";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { AppFooterComponent } from "./app-footer/app-footer.component";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { PanelistModule } from "./panelist/panelist.module";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    CdkTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    PanelistModule,
    AgmCoreModule.forRoot({
      apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    }),
    ToastrModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LandingPageComponent,
    AppFooterComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
