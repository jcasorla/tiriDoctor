import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatComponent } from './view-pat.component';

describe('ViewPatComponent', () => {
  let component: ViewPatComponent;
  let fixture: ComponentFixture<ViewPatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
