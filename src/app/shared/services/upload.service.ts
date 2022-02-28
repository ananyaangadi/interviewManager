import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAddJobRequest } from "app/job/add/add-job-request.interface";
import { Observable } from "rxjs";
import {
  UPLOAD_CANDIDATE,
  UPLOAD_INVENTORY,
  UPLOAD_JOB,
} from "../constants/endpoints-constants";

@Injectable({
  providedIn: "root",
})
export class UploadService {
  constructor(private httpClient: HttpClient) {}

  public uploadInventoryFile(file: File): Observable<any> {
    let formParams = new FormData();
    formParams.append("file", file);
    return this.httpClient.post(UPLOAD_INVENTORY, formParams);

    // Local Testing
    // return this.httpClient.post(
    //   "https://msim-services.azurewebsites.net/upload/inventory",
    //   formParams
    // );
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
    return this.httpClient.post(UPLOAD_CANDIDATE, formParams);

    // Local testing
    // return this.httpClient.post<any>(
    //   "https://msim-services.azurewebsites.net/addCan",
    //   formParams
    // );
  }

  public uploadJobFile(job: IAddJobRequest, file: File): Observable<any> {
    let formParams = new FormData();
    formParams.append("file", file);
    // formParams.append("jbId", job.jbId);
    formParams.append("jbHrId", job.jbHrId);
    formParams.append("jbHmId", job.jbHmId);
    formParams.append("jbHrName", job.jbHrName);
    formParams.append("jbHmName", job.jbHmName);
    formParams.append("jbDesig", job.jbDesig);
    formParams.append("jbMinExp", job.jbMinExp);
    formParams.append("jbMaxExp", job.jbMaxExp);
    formParams.append("jbTyp", job.jbTyp);
    formParams.append("jbDept", job.jbDept);
    formParams.append("jbSubDept", job.jbSubDept);
    formParams.append("jbSkill", job.jbSkill);
    formParams.append("jbQual", job.jbQual);
    formParams.append("jbPostDate", job.jbPostDate);
    formParams.append("jbStatus", job.jbStatus);
    // formParams.append("jbDir", job.jbDir);
    formParams.append("jbCloseDate", job.jbCloseDate);
    return this.httpClient.post(UPLOAD_JOB, formParams);

    // Local testing
    //   return this.httpClient.post<any>(
    //     "https://msim-services.azurewebsites.net/addJob",
    //     formParams
    //   );
  }
}
