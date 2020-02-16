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

  verifyUsername(userName: string): Observable<any> {
    const body = {
      username: userName
    };
    return this.http.dashPost<any>('user/verifyUsername/', JSON.stringify(body));
  }


  verifyEmail(Email: string): Observable<any> {
    const body = {
      email: Email
    };
    return this.http.dashPost<any>('user/verifyEmail/', JSON.stringify(body));
  }

  newUser(userName: string, passw0rd: string, Email: string, HomeAddress: string, WorkAddress: string): Observable<any> {
    const body = {
      username: userName,
      password: passw0rd,
      email: Email,
      homeAddress: HomeAddress,
      workAddress: WorkAddress
    };
    return this.http.dashPost<any>('user/newUser/', JSON.stringify(body));
  }

}
