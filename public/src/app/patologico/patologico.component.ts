import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from './../http.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-patologico',
  templateUrl: './patologico.component.html',
  styleUrls: ['./patologico.component.css']
})
export class PatologicoComponent implements OnInit {
  patologico: any = {};
  errors:any;
  show= true;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) { }
  @Input() pat : any;

  ngOnInit() {
    this.hideActual();
  }


  


  hideActual(){
    // console.log(this.pat.actual);
    if(this.pat.patologico.length >0){
      this.show=false;

    }
    
  }

  refresh(){
    //refresh trick that did work to refresh @Input data
    console.log("in refresh");
    this._router.navigateByUrl("/refresh",{skipLocationChange:true}).then(() =>{
      this._router.navigate([decodeURI(this._location.path())]);
    });

  }
  run(){
    console.log("works?")
  }

  onCreate(pat, form: NgForm): void { 
    console.log("onCreate");
    console.log(form.value);
   
    this._httpService.patologico(pat, form.value).subscribe((data)=>{
      // form.reset();
      this.refresh();

      // this.show=false;
      
    });
  }

  onUpdate(form: NgForm) {
    // console.log("printing on submit");
    // console.log(form.value);
    
    this._httpService.updatePatologico(this.pat,form.value).subscribe({
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
