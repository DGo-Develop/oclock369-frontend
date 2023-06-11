import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/core/models/data.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getDepartments(page = 1, pageSize = 1): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${environment.apiUrl}/operations/departments?page=${page}&pageSize=${pageSize}`
    );
  }

  getCountries(page = 1, pageSize = 1): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${environment.apiUrl}/operations/countries?page=${page}&pageSize=${pageSize}`
    );
  }

  getCities(page = 1, pageSize = 1): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${environment.apiUrl}/operations/cities?page=${page}&pageSize=${pageSize}`
    );
  }

  getIdentificationTypes(page = 1, pageSize = 1): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${environment.apiUrl}/operations/identificationTypes?page=${page}&pageSize=${pageSize}`
    );
  }
}
