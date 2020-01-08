import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PreloadProvider } from '../preload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  user: any;

  constructor(
    private _authService: AuthService,    
      private preload: PreloadProvider
      ) {
        this.user=preload.getUser(); //<-- grabing preloaded data
        
        
        
       }
 
 

  ngOnInit() {
       
  }

}
