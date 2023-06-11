import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorModalService {
  private errorSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor() {}

  setError(errorMessage: string) {
    this.errorSubject.next(errorMessage);
  }

  clearError() {
    this.errorSubject.next(null);
  }

  get error(): string | null {
    return this.errorSubject.value;
  }
}
