import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
 

  constructor(private _http: HttpClient) { }

  getAuth() {

    return this._http.get('/api/auth/send').pipe(tap(res => {
      try {     
        localStorage.setItem('access_token', res['data']['token']);        
      } catch (err) {
        console.log('Login failed!');
      }
    }));
  }

  verifyAuth() {

    return this._http.get('/api/auth/send').pipe(tap(res => {
      try {        
      } catch (err) {
        console.log('Login failed!');
      }
    }));
  }

  logout(){
    localStorage.removeItem('access_token');
    return this._http.get('/api/auth/logout');
  }


  

  getDecodedAccessToken(token: string = localStorage.getItem('access_token')): any {
    try {
      return jwt_decode(token);
    } catch (err) {
      return null;
    }
  }
  
}
