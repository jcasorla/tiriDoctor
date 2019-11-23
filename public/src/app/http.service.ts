import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient){
	  //this.getAuthors();
    
}
getPatients() {
  return this._http.get('/api/pacientes');
}
getPatient(id) {
  return this._http.get('/api/pacientes/' + id);
}

addPatient(data){
  return this._http.post('/api/pacientes', data);
}

updatePatient(data) {
  return this._http.put('/api/pacientes/' + data._id, data);
}
deletePatient(id) {
  return this._http.delete('/api/pacientes/' + id);
}

actual(pat,actual){
  let url='/api/pacientes/' + pat._id + '/actual/';
  // console.log(actual);
  // console.log("I am in actual in service");
  return this._http.post(url,actual);
}

updateActual(pat,actual){
  // let url='/api/pacientes/' + pat._id + '/actual/'; 
  let url='/api/pacientes/actual/' +actual._id; 
  // console.log("I am in update actual in service");
  // console.log(actual);
  // console.log(url);

  return this._http.put(url,actual);
}

patologico(pat,data){
  let url='/api/pacientes/' + pat._id + '/patologico/';
  console.log("I am in service");
  console.log(data);
  
  return this._http.post(url,data);
}

updatePatologico(pat,data){
  // let url='/api/pacientes/' + pat._id + '/actual/'; 
  let url='/api/pacientes/patologico/' +data._id; 
  // console.log("I am in update in service");
  // console.log(data);
  // console.log(url);

  return this._http.put(url,data);
}



}



