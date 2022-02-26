import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UPLOAD_INVENTORY } from "../shared/constants/endpoints-constants";

@Injectable({
  providedIn: "root",
})
export class InventoryUploadService {
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
}
