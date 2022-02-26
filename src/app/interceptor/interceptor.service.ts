import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "app/shared/constants/endpoints-constants";
import { ToastrService } from "ngx-toastr";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      url: `${BASE_URL}${req.url}`,
    });

    return next.handle(req).pipe(
      catchError((error: any, caught: Observable<any>) => {
        return this.handleError(error, req);
      })
    );
  }

  handleError(error: HttpErrorResponse, req: any): Observable<any> {
    if (error.status < 200 || error.status > 400) {
      const errorMsg = error.error && error.message;
      this.toastr.error(errorMsg);
      return of();
    } else {
      return throwError(error);
    }
  }
}
