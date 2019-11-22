import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPatComponent } from './list-pat.component';

describe('ListPatComponent', () => {
  let component: ListPatComponent;
  let fixture: ComponentFixture<ListPatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
