import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = this.authService.addAuthHeaders(request);
    if (!this.authService.isLoggedIn.value) {
      return next.handle(authReq);
    }

    // Check if the token is expired before making the request
    if (this.authService.isTokenExpired()) {
      return this.authService.refreshTokensAndRetry(authReq, next);
    } else {
      return next.handle(authReq).pipe(
        catchError((error) => {
          if (error.status === 401) {
            // token might be expired, try to refresh it
            return this.authService.refreshTokensAndRetry(authReq, next);
          } else {
            // propagate the error
            return throwError(error);
          }
        })
      );
    }
  }
}
