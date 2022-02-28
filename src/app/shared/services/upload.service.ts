import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  UPLOAD_CANDIDATE,
  UPLOAD_INVENTORY,
} from "../constants/endpoints-constants";

@Injectable({
  providedIn: "root",
})
export class UploadService {
  constructor(private httpClient: HttpClient) {}

  public uploadInventoryFile(file: File) {
    let formParams = new FormData();
    formParams.append("file", file);
    return this.httpClient.post(UPLOAD_INVENTORY, formParams);

    // Local Testing
    // return this.httpClient.post(
    //   "https://msim-services.azurewebsites.net/upload/inventory",
    //   formParams
    // );
  }

  public uploadCandidateFile(candidate: AddCandidate, file: File) {
    let formParams = new FormData();
    formParams.append("file", file);
    console.log("Candidate: ", candidate);
    formParams.append("canaddJbId", candidate.canaddJbId);
    formParams.append("canaddName", candidate.canaddName);
    formParams.append("canaddEmail", candidate.canaddEmail);
    formParams.append("canaddSkill", candidate.canaddSkill);
    formParams.append("canaddQual", candidate.canaddQual);
    formParams.append("canaddStatus", candidate.canaddStatus);
    formParams.append("canaddResumeDir", candidate.canaddResumeDir);
    return this.httpClient.post(UPLOAD_CANDIDATE, formParams);

    // Local testing
    //   "https://msim-services.azurewebsites.net/addcan",
    //   formParams
    // );
  }
}
