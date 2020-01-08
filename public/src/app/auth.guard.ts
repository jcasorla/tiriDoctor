import { Injectable } from '@angular/core';
import { Router,CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {
  status: any;
  constructor(
    private _authService: AuthService,
    private _router: Router
    ){
      this.status=true;
    }
    
  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let url: string = state.url; 
      return this.getToken(url);

  }

  

  getToken(url): boolean { 
     
    const observable = this._authService.verifyAuth();
    observable.subscribe(data => {
      if(!data['data']['token']){
        localStorage.removeItem('access_token');
        this.express();
        this.status=false;
      }else{
        this.status=true;
      }
      
      
     
    });
    return this.status;
  }

  express(){
    window.location.href = '/login';
    window.location.reload(true)
    
   
  }
  
}
