import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as HttpStatusCode from 'http-status-codes';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<{token: string}>(`${environment.backendEndpoint}/login`, {email, password})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.FORBIDDEN) {
            return throwError('User does not exist or the password is wrong.');
          }
          return throwError(err.error);
        })
      );
  }

  signUp(email: string, password: string) {
    return this.http.post(`${environment.backendEndpoint}/signup`, { email, password })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.CONFLICT) {
            return throwError('User already exists.');
          }
          return throwError(err.error);
        })
      );
  }
}
