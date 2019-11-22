import { HttpService } from './http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



// Implement OnInit.
export class AppComponent implements OnInit {
    // title='app';
    // newfield: any = {};
    // selectedfield: any;
    // field: any= [];
    constructor(private _httpService: HttpService){}
    // ngOnInit will run when the component is initialized, after the constructor method.
    ngOnInit(){
     
    }

 

 
    
}



