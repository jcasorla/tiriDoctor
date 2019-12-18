import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PreloadProvider } from '../preload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // user ={firstName: '', lastName: ''}
  // user2 : any;
  user: any;

  constructor(
    private _authService: AuthService,    
      private preload: PreloadProvider
      ) {
        this.user=preload.getUser(); //<-- grabing preloaded data
        // console.log('user3')
        // console.log(this.user);
        // console.log('user3')

        // this._authService.user$.subscribe(user=>{
        //   this.user.firstName=user.firstName;
        //   this.user.lastName=user.lastName;
        // });
        
        
       }
 
 

  ngOnInit() {
    // this.getUser();
    // this.user2=JSON.parse(localStorage.getItem('user'));
    // console.log('works ?');
    // console.log(this.user2);
       
  }

  // getUser() { 
  //   this._authService.getUser();      
  // }

}
