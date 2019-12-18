
import { Component, OnInit, OnChanges, ComponentFactory} from '@angular/core';
// import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError  } from '@angular/router';
import { AuthService } from './auth.service';
// import {Location} from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



// Implement OnInit.
export class AppComponent implements OnInit, OnChanges {
    title='TiriDoctor';
    // mytoken: any;
    // loggedin;
    
    constructor(  
      private _authService: AuthService,    
      // private _route: ActivatedRoute,
      // private _router: Router,
      // private _location: Location
      ){
      
        // this.getToken();
        // _router.events.subscribe((event: Event) => {
        //   if (event instanceof NavigationStart) {
        //     // this.getToken();
        //     // if(!localStorage.getItem('access_token')){
        //     //   this.getToken();
        //     //   _router.navigateByUrl('/app/home');
        //     // }
        //     console.log("how many times");
           
        //   }
        // });
        
        // this.getToken();
      }

    // ngOnInit will run when the component is initialized, after the constructor method.
    ngOnInit(){
      // this.getToken();

    }

    ngOnChanges(){
      
    }

    logout(){
      console.log("loggin out");
        const observable = this._authService.logout();
      observable.subscribe(data => {
        window.location.href = '/login';
      });


    }

    // refresh(){
    //   //refresh trick that did work to refresh @Input data
    //   this._router.navigateByUrl("/refresh",{skipLocationChange:true}).then(() =>{
    //     this._router.navigate([decodeURI(this._location.path())]);
    //   });
  
    // }
    
 
    // getToken() {    
    //   const observable = this._authService.getAuth();
    //   observable.subscribe(data => {
    //     // console.log(data);
    //     // if(!data){
    //     //   this.express();
    //     // }
       
    //   });
    // }

    // express(){
    //   window.location.href = '/login';
    //   window.location.reload(true)
      
     
    // }
    
}



