import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../auth/auth.interfaces';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('accessToken');
    let newHeaders = request.headers;
    if (token) {
      const decodedToken: DecodedToken = jwt_decode(token);
      newHeaders = newHeaders.append('Authorization', `Bearer ${token}`);
      newHeaders = newHeaders.append('UserID', `${decodedToken.user.user_id}`);
      newHeaders = newHeaders.append('ApiKey', `${decodedToken.apiKey}`);
    }
    const authReq = request.clone({ headers: newHeaders });
    return next.handle(authReq);
  }
}

