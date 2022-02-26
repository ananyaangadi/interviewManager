import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BASE_URL,
  GET_JOB_URL,
  UPLOAD_INVENTORY,
} from "./shared/constants/endpoints-constants";

@Injectable({
  providedIn: "root",
})
export class InventoryUploadService {
  private http: HttpClient;

  constructor(private httpClient: HttpClient, handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": undefined,
    }),
  };

  public uploadInventoryFile(file: File) {
    let formParams = new FormData();
    formParams.append("inventory", file);
    return this.httpClient.post(UPLOAD_INVENTORY, formParams, {
      //   headers: {
      //     "Content-Type": "file",
      //   },
    });
    // return this.httpClient.post('https://msim-services.azurewebsites.net/upload/inventory', formParams);

    // return this.http.post('https://msim-services.azurewebsites.net/upload/inventory', formParams, this.httpOptions);
  }
}
