import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FisicoComponent } from './fisico.component';

describe('FisicoComponent', () => {
  let component: FisicoComponent;
  let fixture: ComponentFixture<FisicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FisicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FisicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
