import { Injectable } from '@angular/core';
import { HttpclientService } from 'src/app/services/httpclient.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpclientService) { }

  searchItems(name: string): Observable<any[]> {
    const body = {
      Name: name
    };
    return this.http.dashPost<Comment[]>('comment/log', JSON.stringify(body));
  }

}
