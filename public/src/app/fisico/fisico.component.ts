import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fisico',
  templateUrl: './fisico.component.html',
  styleUrls: ['./fisico.component.css']
})
export class FisicoComponent implements OnInit {

  constructor() { }
  @Input() displayFisico : any;

  ngOnInit() {
  }

}
