import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      // console.log(params['id'])
      let id=params['id'];
      this.findPatient(id)
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
  }
  showFamiliar(data): void { 
    // console.log("in familiar");
    
    this.displayFamiliar = true;
    this.displayIllness=null;
    this.displayPatologico = null;
    this.displayNoPatologico = null;
    this.displayFisico = null;
    this.displayGineco = null;
  }
  showPatologico(data): void { 
    // console.log("in patologico");
    this.displayPatologico = true;
    this.displayFamiliar = null;
    this.displayIllness=null;
    this.displayNoPatologico = null;
    this.displayFisico = null;
    this.displayGineco = null;
  }
  showNoPatologico(data): void { 
    // console.log("in no patologico");
    this.displayNoPatologico = true;
    this.displayPatologico = null;
    this.displayFamiliar = null;
    this.displayIllness=null;
    this.displayFisico = null;
    this.displayGineco = null;
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
  }

  showFisico(data): void { 
    // console.log("in fisico");
    this.displayFisico = true;
    this.displayNoPatologico = null;
    this.displayPatologico = null;
    this.displayFamiliar = null;
    this.displayIllness=null;
    this.displayGineco = null;
  }

}
