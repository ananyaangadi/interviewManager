import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FinalFeedbackComponent } from "./final-feedback/final-feedback.component";
import { QuestionBankComponent } from "./question-bank/question-bank.component";

const routes: Routes = [
  {
    path: "question-bank",
    component: QuestionBankComponent,
  },
  {
    path: "final-feedback",
    component: FinalFeedbackComponent,
  },
  {
    path: "**",
    component: QuestionBankComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterviewRoutingModule {}
