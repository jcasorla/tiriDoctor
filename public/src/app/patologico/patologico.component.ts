import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-patologico',
  templateUrl: './patologico.component.html',
  styleUrls: ['./patologico.component.css']
})
export class PatologicoComponent implements OnInit {

  constructor() { }
  @Input() displayPatologico : any;

  ngOnInit() {
  }

}
