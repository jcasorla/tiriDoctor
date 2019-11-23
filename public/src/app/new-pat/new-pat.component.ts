import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { HttpService } from './../http.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-pat',
  templateUrl: './new-pat.component.html',
  styleUrls: ['./new-pat.component.css']
})
export class NewPatComponent implements OnInit {

  @Output()
  newpatient: any = {};
  errors:any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  onSubmit(event: Event, form: NgForm) {
    console.log("enter? "+ this.newpatient.firstName);
    
    this._httpService.addPatient(this.newpatient).subscribe({
      next: (data)=>{
      
      // console.log("I am in add: ", data);
      form.reset();
      this._router.navigate(['/list']);
      // this.router.navigateByUrl('/');


    },
      error: error => {
        console.log(error);
        this.errors=error.error;

    }
    });
  }

}
