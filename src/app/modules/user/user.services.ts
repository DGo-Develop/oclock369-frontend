import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/core/models/data.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  requestResetPassword(email: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${environment.apiUrl}/users/users/request-reset-password`,
      {
        params: { email },
      }
    );
  }

  verifyResetToken(token: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${environment.apiUrl}/users/users/verify-reset-token`,
      {
        params: { token },
      }
    );
  }

  updatePassword(
    userId: string,
    password: string
  ): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(
      `${environment.apiUrl}/users/users/update-password`,
      {
        user_id: userId,
        password,
      }
    );
  }
}
