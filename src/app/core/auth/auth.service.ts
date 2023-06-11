import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthResponse, DecodedToken } from './auth.interfaces';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  user$ = new BehaviorSubject<User | null>(null);

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .get<AuthResponse>(`${environment.apiUrl}/users/auth/login`, {
        params: { email, password },
      })
      .pipe(
        tap((response) => {
          this.storeTokens(response.data);
          localStorage.setItem('isAuthenticated', 'true');
        })
      );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
    this.isLoggedIn.next(false);

    this.router.navigate(['/login']);
  }

  isTokenExpired(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) {
      return true;
    }
    if (this.isTokenExpiredHelper(accessToken)) {
      if (this.isTokenExpiredHelper(refreshToken)) {
        this.logout();
        return true;
      }
    }
    return false;
  }

  isLoggedIn = new BehaviorSubject<boolean>(this.checkIfLoggedIn());

  refreshTokens(): Observable<string> {
    return new Observable((observer) => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken && !this.isTokenExpiredHelper(refreshToken)) {
        this.http
          .get<AuthResponse>(`${environment.apiUrl}/users/auth/refreshToken`, {
            headers: { refreshToken: refreshToken },
          })
          .subscribe(
            (response) => {
              this.storeTokens(response.data);
              observer.next(response.data.accessToken);
              observer.complete();
            },
            (error) => {
              this.logout();
              observer.error(error);
            }
          );
      } else {
        this.logout();
        observer.error('No refresh token');
      }
    });
  }

  addAuthHeaders(request: HttpRequest<any>): HttpRequest<any> {
    let newHeaders = request.headers;
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken: DecodedToken = jwt_decode(token);
      newHeaders = newHeaders.append('Authorization', `Bearer ${token}`);
      newHeaders = newHeaders.append('UserID', `${decodedToken.user.user_id}`);
      newHeaders = newHeaders.append('ApiKey', `${decodedToken.apiKey}`);
    }
    return request.clone({ headers: newHeaders });
  }

  refreshTokensAndRetry(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> | Observable<never> {
    return this.refreshTokens().pipe(
      switchMap((newToken: string) => {
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${newToken}`,
          },
        });
        return next.handle(clonedRequest);
      }),
      catchError((error) => {
        this.logout();
        return throwError(error);
      })
    );
  }

  private storeTokens(tokens: {
    accessToken: string;
    refreshToken: string;
  }): void {
    if (tokens.accessToken)
      localStorage.setItem('accessToken', tokens.accessToken);

    if (tokens.refreshToken)
      localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  private isTokenExpiredHelper(token: string): boolean {
    const decoded: DecodedToken = jwt_decode(token);
    const expirationDate = new Date(decoded.exp * 1000);
    return expirationDate.valueOf() <= new Date().valueOf();
  }

  private checkIfLoggedIn(): boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    return isAuthenticated === 'true' && !this.isTokenExpired();
  }
}
