import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gineco',
  templateUrl: './gineco.component.html',
  styleUrls: ['./gineco.component.css']
})
export class GinecoComponent implements OnInit {

  constructor() { }
  @Input() displayGineco : any;

  ngOnInit() {
  }

}
