import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private http = inject(HttpClient);
  private baseUrl = environment.api_base_url;

  // ==============================================Get Methode==============================================

  Get<T>(Endpoint: string, Params?: { [key: string]: any }): Observable<T> {
    let httpprams = new HttpParams();
    if (Params) {
      Object.keys(Params).forEach((key) => {
        if (Params[key] !== null && Params[key] !== undefined) {
          httpprams = httpprams.append(key, Params[key].toString());
        }
      });
    }
    return this.http.get<T>(`${this.baseUrl}${Endpoint}`, {
      params: httpprams,
    });
  }
  // ==============================================POST Request============================================== //

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body);
  }
  // ============================================== Delete Request ============================================== //

  delete<T>(endpoint: string, params?: { [key: string]: any }): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        const value = params[key];

        if (value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              httpParams = httpParams.append(key, item.toString());
            });
          } else {
            httpParams = httpParams.append(key, value.toString());
          }
        }
      });
    }
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, {
      params: httpParams,
    });
  }

  deleteMany<T>(endpoint: string, ids: string[]): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, {
      body: { ids },
    });
  }

  // ============================================== Put Request ============================================== //

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body);
  }

  // ============================================== Patch Request ============================================== //

  patch<T>(endpoint: string, body: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${endpoint}`, body);
  }
}
