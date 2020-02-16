import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  contentheaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }


  dashPost<T>(url: string, body: string): Observable<T> {
    return this.http.post<T>(this.getUrl() + url, body, this.httpOptions);
  }

  dashGet<T>(url: string): Observable<T> {
    return this.http.get<T>(this.getUrl() + url, this.httpOptions);
  }

  mapGet<T>(url: string): Observable<T> {
    const headerUrl = 'http://localhost:8000/maps.googleapis.com:443/maps/api/';
    const apiKey = 'AIzaSyDVz_U6kBNHKduZ_7VsehBiTOoYK5Z-HhM';
    return this.http.get<T>(headerUrl + url + apiKey, this.httpOptions);
  }




  getUrl() {
    // const searchUrl = 'https://a681234.appspot.com/';
    const searchUrl = 'http://localhost:8081/';
    return searchUrl;
  }
}

