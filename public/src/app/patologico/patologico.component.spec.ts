import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatologicoComponent } from './patologico.component';

describe('PatologicoComponent', () => {
  let component: PatologicoComponent;
  let fixture: ComponentFixture<PatologicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatologicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
