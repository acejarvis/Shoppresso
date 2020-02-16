import { Injectable } from '@angular/core';
import { HttpclientService } from './httpclient.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpclientService) { }

  currentUser = 'JarvisIsGay';
  currentUserEmail = 'JarvisIsGay';
  currentUserHome = 'JarvisIsGay';
  currentUserWork = 'JarvisIsGay';

  login(userName: string, passw0rd: string): Observable<any> {
    const body = {
      username: userName,
      password: passw0rd
    };
    return this.http.dashPost<any>('user/login/', JSON.stringify(body));
  }

  getCurrentUser(): Observable<any> {
    return this.http.dashGet<any>('user/getCurrentUser/');
  }

  logout(): Observable<any> {
    return this.http.dashGet<any>('user/logout/');
  }

}
