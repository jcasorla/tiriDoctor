import { Component, OnInit, OnChanges } from '@angular/core';
import { PreloadProvider } from '../preload';
import { UserService } from '../user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnChanges {
  usertmp: any;
  user= {_id: '', firstName: '', lastName: '', username: '', email: ''};
  user2= {_id: '', firstName: '', lastName: '', username: '', email: ''};
  errors:any;
  displayName: any;
  displayEmail: any;
  displayUn: any;
  displayPwd: any;

  constructor(
    private _userService: UserService,
    private preload: PreloadProvider,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.usertmp=preload.getUser(); //<-- grabing preloaded data
    
  }

  ngOnInit() {
    this.findUser(this.usertmp.uid);
    
  }
  ngOnChanges(){
    this.findUser(this.usertmp.uid);
  }

  findUser(id) {
    const observable = this._userService.getUser(id);
    observable.subscribe(data => {      
      this.user = data['user'];
    });
    
  }

  onSubmit() {
    console.log('edit account');
    
    this._userService.updateUser(this.user).subscribe({
      next: (data)=>{
        this._router.navigate(['/app/list'])
      
      },
        error: error => {
          console.log(error);
          this.errors=error.error;
  
      }
      
    });
  }
  onSubmitConfirm(form: NgForm) {
    console.log('edit account confirm');
    console.log(form.value);
    
    this._userService.updateUserConfirm(form.value).subscribe({
      next: (data)=>{
        this._router.navigate(['/app/list'])
      
      },
        error: error => {
          console.log(error);
          this.errors=error.error;
  
      }
      
    });
  }

  showName(): void { 
    this.displayName=true;
    this.displayEmail=null;
    this.displayPwd=null;
    this.displayUn=null;    
  }

  showEmail(): void { 
    this.displayName=null;
    this.displayEmail=true;
    this.displayPwd=null;
    this.displayUn=null;    
  }

  showUn(): void { 
    this.displayName=null;
    this.displayEmail=null;
    this.displayPwd=null;
    this.displayUn=true;    
  }
  showPw(): void { 
    this.displayName=null;
    this.displayEmail=null;
    this.displayPwd=true;
    this.displayUn=null;    
  }

}
