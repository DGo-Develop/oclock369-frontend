// http-error.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageModalService } from '../message-modal/message-modal.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messModalService: MessageModalService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.messModalService.showError.next({
          title: 'Error',
          message: `${
            error.error?.error?.message ??
            'Error en la operación, valide con el administrador.'
          }`,
          type: 'danger',
        });
        return throwError(error);
      })
    );
  }
}
