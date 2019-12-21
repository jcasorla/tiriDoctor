import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from './../http.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-problemas',
  templateUrl: './problemas.component.html',
  styleUrls: ['./problemas.component.css']
})
export class ProblemasComponent implements OnInit {

  newproblem: any = {};
  editproblem: any ={};
  errors:any;
  shownew= false;
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
    // this.hideActual();
  }

  // hideActual(){
  //   // console.log(this.pat.actual);
  //   if(this.pat.familiar.length >0){
  //     this.show=false;

  //   }
    
  // }

  showNew(){
    this.shownew=true;
    this.showedit=false;
  }
  showList(){
    this.showlist=true;
  }
  hideList(){
    this.showlist=false;
  }

  showEdit(list){
    this.editproblem=list;
    // console.log(this.editproblem);
    this.showedit=true;
    this.shownew=false;
  }

  refresh(){
    //refresh trick that did work to refresh @Input data
    this._router.navigateByUrl("/refresh",{skipLocationChange:true}).then(() =>{
      this._router.navigate([decodeURI(this._location.path())]);
    });

  }
  

  onCreate(pat, form: NgForm): void { 
       
    this._httpService.problema(pat, form.value).subscribe({
      next: (data)=>{        
        this.refresh();    
       
       },
         error: error => {
           this.errors=error.error; 
          //  console.log(this.errors); 
       }
       
     });     
  }

  onUpdate(form: NgForm) {
    console.log(this.pat.problema);
    this._httpService.updateProblema(this.pat,form.value).subscribe({
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
    if(confirm("Estas seguro de eliminar a " +data.nombre)){
      const observable = this._httpService.deleteProblema(this.pat,data);
      
      observable.subscribe(data => {
        this.refresh();
      });
    }
    
  }

}
