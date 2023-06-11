import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Guide } from '../models/guide.model';
import { ApiResponse } from 'src/app/core/models/data.model';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(private http: HttpClient) {}

  getRouteHistory(guide_number: string): Observable<ApiResponse<Guide>> {
    return this.http.get<ApiResponse<Guide>>(
      `${environment.apiUrl}/routes/${guide_number}/history`
    );
  }
}
