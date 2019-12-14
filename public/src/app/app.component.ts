// import { HttpService } from './http.service';
// import { Component, OnInit } from '@angular/core';

import { Component, OnInit, ComponentFactory } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



// Implement OnInit.
export class AppComponent implements OnInit {
    // title='app';
    // newfield: any = {};
    mytoken: any;
    // field: any= [];
    constructor(
      private _authService: AuthService,
      private router: Router
      ){}
    // ngOnInit will run when the component is initialized, after the constructor method.
    ngOnInit(){
      this.getToken();
      // window.location.href = '/login';
     
    }

    getToken() {
    
      const observable = this._authService.getAuth();
      observable.subscribe(data => {
        console.log(data);
        if(!data){
          this.express();
        }
       
      });
    }

    express(){
      window.location.href = '/login';
      
     
    }



 

 
    
}



