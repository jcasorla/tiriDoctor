import { Component, OnInit} from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-pat',
  templateUrl: './edit-pat.component.html',
  styleUrls: ['./edit-pat.component.css']
})
export class EditPatComponent implements OnInit {
  editPatient: any = {};
  errors:any;

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      let id=params['id'];
      this.findPatient(id)
  });
  }

  findPatient(id) {
    const observable = this._httpService.getPatient(id);
    observable.subscribe(data => {
      this.editPatient = data['paciente'];
    });
  }

  onSubmit() {
    
    this._httpService.updatePatient(this.editPatient).subscribe({
      next: (data)=>{
        this._router.navigate(['/app/list'])
      
      },
        error: error => {
          console.log(error);
          this.errors=error.error;
  
      }
      
    });
  }

}
