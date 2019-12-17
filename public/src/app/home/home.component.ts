import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError  } from '@angular/router';
import { AuthService } from '../auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user ={firstName: '', lastName: ''}
  user2 : any;

  constructor(
    private _authService: AuthService,    
      private _route: ActivatedRoute,
      private _router: Router,
      private _location: Location
      ) {

        this._authService.user$.subscribe(user=>{
          this.user.firstName=user.firstName;
          this.user.lastName=user.lastName;
        });
        // _router.events.subscribe((event: Event) => {
        //   if (event instanceof NavigationStart) {
        //     this._authService.user$.subscribe(user=>{
        //       this.user.firstName=user.firstName;
        //       this.user.lastName=user.lastName;
        //     });
            
        //   }
        //   //   if(!localStorage.getItem('access_token')){
              
            
        //   //   this.refresh();
            
           
        //   // }
        // });
        
       }
  
  // user ={firstName: '', lastName: '', email: '', username: '', uid: ''}

  ngOnInit() {
    this.getUser();
    this.user2=JSON.parse(localStorage.getItem('user'));
    console.log('works ?');
    console.log(this.user2);
   
    
    // console.log(this.user);
  }

  getUser() { 
    this._authService.getUser();      
  }

    refresh(){
    //refresh trick that did work to refresh @Input data
    this._router.navigateByUrl("/refresh",{skipLocationChange:true}).then(() =>{
      this._router.navigate([decodeURI(this._location.path())]);
    });

  }

   


}
