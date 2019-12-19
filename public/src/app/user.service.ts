import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getUser(id) {
    return this._http.get('/api/user/' + id);
  }
  updateUser(data) {
    return this._http.put('/api/user/' + data._id, data);
  }
  updateUserConfirm(data) {
    console.log("in service updateconfirm");
    return this._http.put('/api/user/confirm/' + data._id, data);
  }
}
