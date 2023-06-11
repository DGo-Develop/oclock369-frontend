import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  logError(message: string, stack: string) {
    console.error(`${environment.appName}: An error occurred`, {
      message,
      stack,
    });
  }
}
