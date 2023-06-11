import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { tap } from 'rxjs/operators';
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
      } else {
        this.refreshTokens();
      }
    }
    return false;
  }

  isLoggedIn = new BehaviorSubject<boolean>(this.checkIfLoggedIn());

  private checkIfLoggedIn(): boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    return isAuthenticated === 'true' && !this.isTokenExpired();
  }

  private refreshTokens(): void {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken)
      if (!this.isTokenExpiredHelper(refreshToken)) {
        if (refreshToken) {
          this.http
            .get<AuthResponse>(
              `${environment.apiUrl}/users/auth/refreshToken`,
              {
                headers: { refreshToken: refreshToken },
              }
            )
            .subscribe(
              (response) => {
                this.storeTokens(response.data);
              },
              (error) => {
                this.logout();
                // Si ocurre un error al renovar el token, redirige al usuario a la página de login
                this.router.navigate(['/login']);
              }
            );
        } else {
          // Si no hay refreshToken, redirige al usuario a la página de login
          this.router.navigate(['/login']);
        }
      } else {
        // Si no hay refreshToken, redirige al usuario a la página de login
        this.router.navigate(['/login']);
      }
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
}
