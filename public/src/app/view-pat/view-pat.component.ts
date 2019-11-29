import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-pat',
  templateUrl: './view-pat.component.html',
  styleUrls: ['./view-pat.component.css']
})
export class ViewPatComponent implements OnInit {
  selectedpat: any = {};
  errors:any;
  displayIllness: any;
  displayFamiliar: any;
  displayPatologico: any;
  displayNoPatologico: any;
  displayGineco: any;
  displayFisico: any;
  displayProblemas: any;
  

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      // console.log(params['id'])
      let id=params['id'];
      this.findPatient(id)
  });
  }

  refresh(){
    //refresh trick that did work to refresh @Input data
    this._router.navigateByUrl("/refresh",{skipLocationChange:true}).then(() =>{
      this._router.navigate([decodeURI(this._location.path())]);
    });

  }

  findPatient(id) {
    const observable = this._httpService.getPatient(id);
    observable.subscribe(data => {
      // console.log(data['paciente']);
      this.selectedpat = data['paciente'];
    });
  }

  onClickDelete(id) {
    const observable = this._httpService.deletePatient(id);
    observable.subscribe(data => {
      // console.log(data);
      this._router.navigate(['/list']);
    });
  }
  showActual(): void { 
    // console.log("in actual");
    
    this.displayIllness = true;
    this.displayFamiliar=null;
    this.displayPatologico = null;
    this.displayNoPatologico = null;
    this.displayFisico = null;
    this.displayGineco = null;
    this.displayProblemas = null;
  }
  showFamiliar(data): void { 
    // console.log("in familiar");
    
    this.displayFamiliar = true;
    this.displayIllness=null;
    this.displayPatologico = null;
    this.displayNoPatologico = null;
    this.displayFisico = null;
    this.displayGineco = null;
    this.displayProblemas = null;
  }
  showPatologico(data): void { 
    // console.log("in patologico");
    this.displayPatologico = true;
    this.displayFamiliar = null;
    this.displayIllness=null;
    this.displayNoPatologico = null;
    this.displayFisico = null;
    this.displayGineco = null;
    this.displayProblemas = null;
  }
  showNoPatologico(data): void { 
    // console.log("in no patologico");
    this.displayNoPatologico = true;
    this.displayPatologico = null;
    this.displayFamiliar = null;
    this.displayIllness=null;
    this.displayFisico = null;
    this.displayGineco = null;
    this.displayProblemas = null;
  }

  showGineco(data): void { 
    // console.log("in gineco");
    this.displayGineco = true;
    this.displayPatologico = null;
    this.displayNoPatologico = null;
    this.displayFamiliar = null;
    this.displayIllness=null;
    this.displayNoPatologico = null;
    this.displayFisico = null;
    this.displayProblemas = null;
  }

  showFisico(data): void { 
    // console.log("in fisico");
    this.displayFisico = true;
    this.displayNoPatologico = null;
    this.displayPatologico = null;
    this.displayFamiliar = null;
    this.displayIllness=null;
    this.displayGineco = null;
    this.displayProblemas = null;
  }
  showProblemas(data): void { 
    // console.log("in fisico");
    this.displayProblemas = true;
    this.displayNoPatologico = null;
    this.displayPatologico = null;
    this.displayFamiliar = null;
    this.displayIllness=null;
    this.displayGineco = null;
    this.displayFisico = null;
  }

}
