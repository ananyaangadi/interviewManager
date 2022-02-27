import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UploadCandidateComponent } from "./upload-candidate.component";

describe("CandidateComponent", () => {
  let component: UploadCandidateComponent;
  let fixture: ComponentFixture<UploadCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadCandidateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
