import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { StatsComponent } from "./stats.component";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [StatsComponent],
  exports: [StatsComponent],
})
export class StatsModule {}
