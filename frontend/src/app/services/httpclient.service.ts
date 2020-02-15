import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  constructor(private http: HttpClient) { }


  dashPost<T>(url: string, body: string): Observable<T> {
    return this.http.post<T>(this.getUrl() + url, body);
  }

  dashGet<T>(url: string): Observable<T> {
    return this.http.get<T>(this.getUrl() + url);
  }




  getUrl() {
    const searchUrl = 'http://localhost:8081/';
    return searchUrl;
  }
}
