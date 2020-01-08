import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from './../http.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {
  lab: any = {};
  errors:any;
  showGrid= true;
  showtable = false;
  showlab = true;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) { }

  @Input() pat : any;

  ngOnInit() {
    this.hideGrid();
  }

  hideGrid(){
    if(this.pat.grid.length >0){
      this.showGrid=false;

    }
    if(this.pat.lab.length >0){
      this.showlab=false;

    }

    
  }

  refresh(){
    //refresh trick that did work to refresh @Input data
    this._router.navigateByUrl("/refresh",{skipLocationChange:true}).then(() =>{
      this._router.navigate([decodeURI(this._location.path())]);
    });

  }
  showTable(){
    this.showtable=true;
  }
  hideTable(){
    this.showtable=false;
  }
  

  onCreate(pat, form: NgForm): void {     
   
    this._httpService.grid(pat, form.value).subscribe({
      next: (data)=>{        
        this.refresh();
        this.showGrid=false;      
       
       },
         error: error => {
           this.errors=error.error; 
       }
       
     });     
  }
  onCreate2(pat, form: NgForm): void {     
   
    this._httpService.lab(pat, form.value).subscribe({
      next: (data)=>{        
        this.refresh();
        this.showlab=false;      
       
       },
         error: error => {
           this.errors=error.error; 
       }
       
     });     
  }

  onUpdate(form: NgForm) {
    console.log(form.value)
    
    this._httpService.updateGrid(this.pat,form.value).subscribe({
      next: (data)=>{        
       this.refresh();       
      
      },
        error: error => {
          this.errors=error.error;
  
      }
      
    });
  }

  onUpdate2(form: NgForm) {
    
      this._httpService.updateLab(this.pat,form.value).subscribe({
        next: (data)=>{        
         this.refresh();       
        
        },
          error: error => {
            this.errors=error.error;
    
        }
        
      });
    }

}
