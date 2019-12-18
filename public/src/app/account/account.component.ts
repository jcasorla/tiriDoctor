import { Component, OnInit } from '@angular/core';
import { PreloadProvider } from '../preload';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  usertmp: any;
  user= {_id: '', firstName: '', lastName: '', username: '', email: ''};
  constructor(
    private _userService: UserService,
    private preload: PreloadProvider
  ) { 
    this.usertmp=preload.getUser(); //<-- grabing preloaded data
    
  }

  ngOnInit() {
    this.findUser(this.usertmp.uid);
    
  }

  findUser(id) {
    const observable = this._userService.getUser(id);
    observable.subscribe(data => {      
      this.user = data['user'];
    });
    
  }

}
