import { Injectable } from '@angular/core';
import { Router,CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
// import { Observable } from 'rxjs';
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
      // return true;
      let url: string = state.url; 
      return this.getToken(url);

    // let url: string = state.url;  
    // return this.verifyLogin(url);
  }

  //   verifyLogin(url) : boolean{
  //     if(!this.isLoggedIn()){
  //         this.router.navigate(['/login']);
  //         return false;
  //     }
  //     else if(this.isLoggedIn()){
  //         return true;
  //     }
  // }
  // public isLoggedIn(): boolean{
  //     let status = false;
  //     if( localStorage.getItem('isLoggedIn') == "true"){
  //       status = true;
  //     }
  //     else{
  //       status = false;
  //     }
  //     return status;
  // }

  getToken(url): boolean { 
     
    const observable = this._authService.getAuth();
    observable.subscribe(data => {
      console.log(data['data']['token']);
      if(!data['data']['token']){
        localStorage.removeItem('access_token');
        this.express();
        this.status=false;
      }else{
        this.status=true;
      }
      
      
     
    });
    console.log(this.status);
    return this.status;
  }

  express(){
    window.location.href = '/login';
    window.location.reload(true)
    
   
  }
  
}
