import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-pat',
  templateUrl: './list-pat.component.html',
  styleUrls: ['./list-pat.component.css']
})
export class ListPatComponent implements OnInit {
  patients: [];
  selectedPatient: any;
  name : string;

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
      const observable = this._httpService.deletePatient(pat._id);
      
      observable.subscribe(data => {
        // console.log(data);
        this.getAllPacients();
      });
    }
    
  }
  search() {    
    const observable = this._httpService.getPatients();
    observable.subscribe(data => {
      this.patients = data['pacientes'].filter(res=>{
        if(res.firstName.toLocaleLowerCase().match(this.name.toLocaleLowerCase())){
          return res.firstName.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        }
        else if(res.lastName.toLocaleLowerCase().match(this.name.toLocaleLowerCase())){
          return res.lastName.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        }
        
      });
    });
  }

}
