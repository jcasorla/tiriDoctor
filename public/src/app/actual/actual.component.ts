import { Component, OnInit, Input,Output, EventEmitter,OnChanges, ViewChild, SimpleChanges, SimpleChange } from '@angular/core';
import { HttpService } from './../http.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-actual',
  templateUrl: './actual.component.html',
  styleUrls: ['./actual.component.css']
})
export class ActualComponent implements OnInit {
  actual: any = {};
  errors:any;
  show= true;
  index: any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) { }
  @Input() pat : any;


// ngOnChanges solution for refreshing input data which did not work
//#################################################################
//   @Input() notifyItemProcessed: () => void;
  
  
//   consulta: string;
//   enfermedad: string;

//   ngOnChanges(changes: SimpleChanges) {
//     const currentItem: SimpleChange = changes.pat; 
//     console.log(changes.pat.currentValue);
//     console.log(currentItem);

//     if(currentItem.currentValue){
//       console.log("currentValue")
//       console.log(changes.pat.currentValue);
//       console.log("***********")
//       console.log("pat");
//       console.log(this.pat);
//       this.pat=changes.pat.currentValue;
//       this.consulta=changes.pat.currentValue.actual[0].consulta;
//       console.log(changes.pat.currentValue.actual[0].consulta);

//     }

//     this.doSomething(changes.pat.currentValue);
//     You can also use categoryId.previousValue and 
//     categoryId.firstChange for comparing old and new values

// }
//#################################################################

  ngOnInit() {
    this.hideActual();
  }


  hideActual(){
    if(this.pat.actual.length >0){
      this.show=false;
      this.index=this.pat.actual.length-1;

    }
    
  }

  refresh(){
    //refresh trick that did work to refresh @Input data
    this._router.navigateByUrl("/refresh",{skipLocationChange:true}).then(() =>{
      this._router.navigate([decodeURI(this._location.path())]);
    });

  }

  onCreate(pat, form: NgForm): void { 
   
    this._httpService.actual(pat, form.value).subscribe({
      next: (data)=>{        
        this.refresh();
        this.show=false;      
       
       },
         error: error => {
           this.errors=error.error; 
          //  console.log(this.errors); 
       }
       
     });     
  }

  onUpdate(form: NgForm) {
    
    this._httpService.updateActual(this.pat,form.value).subscribe({
      next: (data)=>{
        
        this.refresh();
       
      
      },
        error: error => {
          // console.log(error);
          this.errors=error.error;
  
      }
      
    });
  }


}
