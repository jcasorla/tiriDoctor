import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PreloadProvider {

    private user: any = null;

    constructor(
        private _authService: AuthService,
        private http: HttpClient
        ) {

    }

    public getUser(): any { // <--return user to components
        return this.user;
    }

    load() {
        return new Promise((resolve, reject) => { // <-- preload user from expressjs before angular app loads
          
            this._authService.getAuth().subscribe(data => {
                this.user=data['user'];
                resolve(true);
                    
            
            
            });

        })

        
    }
}