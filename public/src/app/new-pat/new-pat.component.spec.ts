import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPatComponent } from './new-pat.component';

describe('NewPatComponent', () => {
  let component: NewPatComponent;
  let fixture: ComponentFixture<NewPatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
