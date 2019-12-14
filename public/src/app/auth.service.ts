import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private readonly base = '/auth';

  constructor(private _http: HttpClient) { }
  getAuth() {
    return this._http.get('/api/auth/send');
  }
 

  // logout(token?: string) {
  //   if (!token) {
  //     token = localStorage.getItem('access_token');
  //   }
  //   return this.http.post(`${this.base}/logout`, {token}).pipe(tap<string>(res  => {
  //     try {
  //       // First set local storage to an invalidated token, in case client is blocking removal of localStorage
  //       localStorage.setItem('access_token', res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //     // Then, remove access token; this should work in most cases, but above try-catch should invalidate login regardless
  //     localStorage.removeItem('access_token');
  //   }));
  // }
  // verifyLogin(token?: string) {
  //   if (!token) {
  //     token = localStorage.getItem('access_token');
  //   }
  //   return this.http.post(`${this.base}/verify`, {token});
  // }
  // /**
  //  * Checks validity of current login token.
  //  * @returns true if and only if the current login token is valid and non-expired.
  //  */
  // checkValidLogin() {
  //   if (!this.getDecodedAccessToken()) {
  //     return false;
  //   }
  //   if (this.getDecodedAccessToken().exp < Math.round(Date.now() / 1000)) {
  //     this.logout(localStorage.getItem('access_token'));
  //     localStorage.removeItem('access_token');
  //     return false;
  //   }
  //   return true;
  // }
  // public get loggedIn(): boolean {
  //   return localStorage.getItem('access_token') !==  null;
  // }
  // getDecodedAccessToken(token: string = localStorage.getItem('access_token')): any {
  //   try {
  //     return jwt_decode(token);
  //   } catch (err) {
  //     return null;
  //   }
  // }
 
}
