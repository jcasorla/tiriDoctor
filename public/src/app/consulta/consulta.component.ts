import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from './../http.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  newconsulta: any = {};
  editconsulta: any ={};
  errors:any;
  shownew= true;
  showedit= false;
  showlist=false;
  
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) { }

  @Input() pat : any;

  ngOnInit() {
  }

  // showNew(){
  //   this.shownew=true;
  //   this.showedit=false;
  //   this.showlist=false;
  // }

  showEdit(list){
    this.editconsulta=list;
    // console.log(this.editproblem);
    this.showedit=true;
    // this.shownew=false;
  }
  showList(){
    this.showlist=true;
    // this.shownew=false;
  }
  hideList(){
    this.showlist=false;
    // this.showedit=false;
    // this.shownew=true;
  }

  refresh(){
    //refresh trick that did work to refresh @Input data
    this._router.navigateByUrl("/refresh",{skipLocationChange:true}).then(() =>{
      this._router.navigate([decodeURI(this._location.path())]);
    });

  }
  

  // onCreate(pat, form: NgForm): void { 
       
  //   this._httpService.problema(pat, form.value).subscribe({
  //     next: (data)=>{        
  //       this.refresh();    
       
  //      },
  //        error: error => {
  //          this.errors=error.error; 
  //         //  console.log(this.errors); 
  //      }
       
  //    });     
  // }

  // onUpdate(form: NgForm) {
  //   console.log(this.pat.problema);
  //   this._httpService.updateProblema(this.pat,form.value).subscribe({
  //     next: (data)=>{                
  //      this.refresh();      
      
  //     },
  //       error: error => {
  //         // console.log(error);
  //         this.errors=error.error;
  
  //     }
      
  //   });
  // }
  onCreate(pat, form: NgForm): void { 
   
    this._httpService.actual(pat, form.value).subscribe({
      next: (data)=>{        
        this.refresh();
        // this.show=false;      
       
       },
         error: error => {
           this.errors=error.error; 
          //  console.log(this.errors); 
       }
       
     });     
  }

  onUpdate(form: NgForm) {
    console.log('trigger?');
    
    console.log(form.value);
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

  onClickDelete(data) {
    if(confirm("Estas seguro de eliminar a " +data.enfermedad)){
      const observable = this._httpService.deleteActual(this.pat,data);
      
      observable.subscribe(data => {
        this.refresh();
      });
    }
    
  }

}
