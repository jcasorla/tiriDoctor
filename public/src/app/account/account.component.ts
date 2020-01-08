import { Component, OnInit, OnChanges } from '@angular/core';
import { PreloadProvider } from '../preload';
import { UserService } from '../user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnChanges {
  usertmp: any;
  user= {_id: '', firstName: '', lastName: '', username: '', email: ''};
  user2= {_id: '', firstName: '', lastName: '', username: '', email: '', password: '',cpwd: '', current: ''};
  errors:any;
  displayName: any;
  displayEmail: any;
  displayUn: any;
  displayPwd: any;

  constructor(
    private _userService: UserService,
    private preload: PreloadProvider,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) { 
    this.usertmp=preload.getUser(); //<-- grabing preloaded data
    
  }

  ngOnInit() {
    this.findUser(this.usertmp.uid);
    
  }
  ngOnChanges(){
    this.findUser(this.usertmp.uid);
  }

  refresh(){
    //refresh trick that did work to refresh @Input data
    this._router.navigateByUrl("/refresh",{skipLocationChange:true}).then(() =>{
      this._router.navigate([decodeURI(this._location.path())]);
    });

  }

  findUser(id) {
    const observable = this._userService.getUser(id);
    observable.subscribe(data => {      
      this.user = data['user'];
    });
    
  }

  onSubmit() {
    
    this._userService.updateUser(this.user).subscribe({
      next: (data)=>{
        this.refresh();
      
      },
        error: error => {
          console.log(error);
          this.errors=error.error;
  
      }
      
    });
  }
  onSubmitUser(form: NgForm) {
    if(form.value.username===this.user.username){
           
      this.errors= ['El username es el mismo'];
    }
    else{
      this._userService.updateUserConfirm(form.value).subscribe({
        next: (data)=>{
          this.refresh();
        
        },
          error: error => {
            this.errors=error.error;
    
        }
        
      });

    }
    
  }
  onSubmitEmail(form: NgForm) {
    if(form.value.email===this.user.email){
           
      this.errors= ['El correo es el mismo'];
    }
    else{
      this._userService.updateUserEmail(form.value).subscribe({
        next: (data)=>{
          this.refresh();
        
        },
          error: error => {
            this.errors=error.error;
    
        }
        
      });

    }
    
  }
  onSubmitPwd(form: NgForm) {

    if(form.value.password!==form.value.cpwd){
           
      this.errors= ['las contraseñas no coinciden'];
    }
    else if(form.value.password===null || form.value.cpwd===null || form.value.current===null){
           
      this.errors= ['todos son obligatorios'];
    }
    
    else{
      this._userService.updateUserPwd(form.value).subscribe({
        next: (data)=>{
          this.refresh();
        
        },
          error: error => {
            console.log(error);
            this.errors=error.error;
    
        }
        
      });

    }
   
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
