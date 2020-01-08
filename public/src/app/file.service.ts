import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from "@angular/core";
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FileService {

    constructor(private _http:HttpClient){}

    downloadFile(file:String){
        var body = {filename:file};

        return this._http.post('http://localhost:8000/api/file/download',body,{
            responseType : 'blob',
            headers:new HttpHeaders().append('Content-Type','application/json')
        });
    }

    deleteFile(pat,data){
        let url='/api/file/delete/' +pat._id; 
        return this._http.put(url,data);
      }
}
