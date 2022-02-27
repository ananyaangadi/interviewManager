import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InterviewRoutingModule } from "./interview-routing.module";
import { QuestionBankComponent } from "./question-bank/question-bank.component";
import { FinalFeedbackComponent } from "./final-feedback/final-feedback.component";
import { InterviewComponent } from "./interview.component";
import { HttpClientModule } from "@angular/common/http";
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
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [
    QuestionBankComponent,
    FinalFeedbackComponent,
    InterviewComponent,
  ],
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
    InterviewRoutingModule,
  ],
})
export class InterviewModule {}
