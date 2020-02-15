import { Injectable } from '@angular/core';
import { HttpclientService } from './httpclient.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpclientService) { }

  login(userName: string, password_: string): Observable<any> {
    const body = {
      username: userName,
      password: password_
    }
    return this.http.dashPost<any>('user/login/', JSON.stringify(body));
  }
}
