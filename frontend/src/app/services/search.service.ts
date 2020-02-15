import { Injectable } from '@angular/core';
import { HttpclientService } from 'src/app/services/httpclient.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpclientService) { }

  searchItems(value: string): Observable<any[]> {
    const body = {
      name: value
    };
    return this.http.dashPost<any[]>('search/', JSON.stringify(body));
  }

  getAll(): Observable<any[]> {
    return this.http.dashGet<any[]>('getlist/');
  }
}
