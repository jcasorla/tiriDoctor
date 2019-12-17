import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import {Subject} from 'rxjs' // make data to subscribe

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private readonly base = '/auth';
  user$ = new Subject<any>();  // subscribe to read
  // hand$ = new Subject<string>();

  constructor(private _http: HttpClient) { }
  getAuth() {
    // return this._http.get('/api/auth/send');

    return this._http.get('/api/auth/send').pipe(tap(res => {
      try {
        console.log("setting token");
        console.log(res['user']);        
        localStorage.setItem('access_token', res['data']['token']);
        localStorage.setItem('user', JSON.stringify(res['user']));         
      } catch (err) {
        console.log('Login failed!');
      }
    }));
  }
  logout(){
    localStorage.removeItem('access_token');
    console.log('logout service');
    return this._http.get('/api/auth/logout');
  }

  getUser(){
    // let temp=this.getDecodedAccessToken();
    console.log('getting user');
    // let temp: any;
    let temp=JSON.parse(localStorage.getItem('user'));
    console.log(temp);
    // console.log(localStorage.getItem('user'));

    // let id : string;
    // id=temp._id;
    // console.log(id);
    
    this.user$.next(temp);
    // return this._http.get('/api/auth/user/' + id);

  }
 
  

  getDecodedAccessToken(token: string = localStorage.getItem('access_token')): any {
    try {
      return jwt_decode(token);
    } catch (err) {
      return null;
    }
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
