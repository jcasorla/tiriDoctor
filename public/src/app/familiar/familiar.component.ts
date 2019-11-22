import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-familiar',
  templateUrl: './familiar.component.html',
  styleUrls: ['./familiar.component.css']
})
export class FamiliarComponent implements OnInit {

  constructor() { }
  @Input() displayFamiliar : any;

  ngOnInit() {
  }

}
