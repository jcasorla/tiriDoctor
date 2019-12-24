import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { HttpService } from './../http.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PreloadProvider } from '../preload';

@Component({
  selector: 'app-new-pat',
  templateUrl: './new-pat.component.html',
  styleUrls: ['./new-pat.component.css']
})
export class NewPatComponent implements OnInit {

  @Output()
  newpatient: any = {};
  errors:any;
  user: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private preload: PreloadProvider
  ) { 
    this.user=preload.getUser(); //<-- grabing preloaded data
  }

  ngOnInit() {
    this.newpatient.creator=this.user.uid;
  }
  onSubmit(event: Event, form: NgForm) {
    this._httpService.addPatient(this.newpatient).subscribe({
      next: (data)=>{
      
      form.reset();
      this._router.navigate(['/app/list']);


    },
      error: error => {
        console.log(error);
        this.errors=error.error;

    }
    });
  }

}
