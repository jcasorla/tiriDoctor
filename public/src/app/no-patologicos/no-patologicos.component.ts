import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-patologicos',
  templateUrl: './no-patologicos.component.html',
  styleUrls: ['./no-patologicos.component.css']
})
export class NoPatologicosComponent implements OnInit {

  constructor() { }
  @Input() displayNoPatologico : any;

  ngOnInit() {
  }

}
