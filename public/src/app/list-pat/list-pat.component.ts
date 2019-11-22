import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-list-pat',
  templateUrl: './list-pat.component.html',
  styleUrls: ['./list-pat.component.css']
})
export class ListPatComponent implements OnInit {
  patients: [];
  selectedPatient: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getAllPacients();
  }

  getAllPacients() {
    
    const observable = this._httpService.getPatients();
    observable.subscribe(data => {
      // console.log("get all pacients");
      // console.log(data);
      this.patients = data['pacientes'];
    });
  }

  onClickDelete(pat) {
    if(confirm("Estas seguro de eliminar a " +pat.firstName + " " +pat.lastName + " " + pat.sLastName)){
      const observable = this._httpService.deletePatient(pat.id);
      observable.subscribe(data => {
        // console.log(data);
        this.getAllPacients();
      });
    }
    
  }

}
