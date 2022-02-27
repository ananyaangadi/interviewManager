import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-completed-card",
  templateUrl: "./completed-card.component.html",
  styleUrls: ["./completed-card.component.scss"],
})
export class CompletedCardComponent implements OnInit {
  @Input() count;
  constructor() {}

  ngOnInit(): void {}
}
