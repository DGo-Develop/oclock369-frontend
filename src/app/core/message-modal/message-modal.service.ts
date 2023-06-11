import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageModalService {
  showError: Subject<{
    title: string;
    message: string;
    type: 'success' | 'warning' | 'danger';
  }> = new Subject();

  constructor() {}
}
