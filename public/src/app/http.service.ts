import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(private _http: HttpClient){}
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
  console.log(actual);
  console.log("I am in actual in service");
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
  // console.log("I am in service");
  // console.log(data);
  
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

noPatologico(pat,data){
  let url='/api/pacientes/' + pat._id + '/nopatologico/';
  // console.log("I am in service");
  // console.log(data);
  
  return this._http.post(url,data);
}

updateNoPatologico(pat,data){
  // let url='/api/pacientes/' + pat._id + '/actual/'; 
  let url='/api/pacientes/nopatologico/' +data._id; 
  // console.log("I am in update in service");
  // console.log(data);
  // console.log(url);

  return this._http.put(url,data);
}

familiar(pat,data){
  let url='/api/pacientes/' + pat._id + '/familiar/';
  
  return this._http.post(url,data);
}

updateFamiliar(pat,data){
  let url='/api/pacientes/familiar/' +data._id; 


  return this._http.put(url,data);
}

gineco(pat,data){
  let url='/api/pacientes/' + pat._id + '/gineco/';
  
  return this._http.post(url,data);
}

updateGineco(pat,data){
  let url='/api/pacientes/gineco/' +data._id; 


  return this._http.put(url,data);
}

fisico(pat,data){
  let url='/api/pacientes/' + pat._id + '/fisico/';
  
  return this._http.post(url,data);
}

updateFisico(pat,data){
  let url='/api/pacientes/fisico/' +data._id; 


  return this._http.put(url,data);
}

problema(pat,data){
  let url='/api/pacientes/' + pat._id + '/problemas/';
   
  return this._http.post(url,data);
}

updateProblema(pat,data){
  let url='/api/pacientes/problemas/' +data._id; 


  return this._http.put(url,data);
}

deleteProblema(pat,data){
  // console.log("is pat empty?");
  // console.log(pat);
  // console.log(data);
  let url='/api/pacientes/problemas/delete/' +data._id; 


  return this._http.put(url,pat);
}




}



