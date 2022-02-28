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

  public uploadInventoryFile(file: File): Observable<any> {
    let formParams = new FormData();
    formParams.append("file", file);
    // return this.httpClient.post(UPLOAD_INVENTORY, formParams);

    // Local Testing
    return this.httpClient.post(
      "https://msim-services.azurewebsites.net/upload/inventory",
      formParams
    );
  }

  public uploadCandidateFile(
    candidate: AddCandidate,
    file: File
  ): Observable<any> {
    let formParams = new FormData();
    formParams.append("file", file);
    formParams.append("canaddJbId", candidate.canaddJbId);
    formParams.append("canaddName", candidate.canaddName);
    formParams.append("canaddEmail", candidate.canaddEmail);
    formParams.append("canaddSkill", candidate.canaddSkill);
    formParams.append("canaddQual", candidate.canaddQual);
    formParams.append("canaddStatus", candidate.canaddStatus);
    formParams.append("canaddResumeDir", candidate.canaddResumeDir);
    // return this.httpClient.post(UPLOAD_CANDIDATE, formParams);

    // Local testing
    return this.httpClient.post<any>(
      "https://msim-services.azurewebsites.net/addCan",
      formParams
    );
  }
}
