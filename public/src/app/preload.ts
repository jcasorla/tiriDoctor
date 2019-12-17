import { Injectable } from '@angular/core';
import { Router,CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
// import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PreloadProvider {

    private user: any = null;

    constructor(
        private _authService: AuthService,
        private http: HttpClient
        ) {

    }

    public getUser(): any {
        return this.user;
    }

    load() {
        return new Promise((resolve, reject) => {
            // this.http
            //     .get('https://api.icndb.com/jokes/random')
            //     .map(res => res.json())
            //     .subscribe(response => {
            //         this.joke = response['value'];
            //         resolve(true);
            //     })

            this._authService.getAuth().subscribe(data => {
                this.user=data['user'];
                console.log("preload");
                console.log(data['user']);
                resolve(true);
                    
            
            
            });

        })

        
    }
}