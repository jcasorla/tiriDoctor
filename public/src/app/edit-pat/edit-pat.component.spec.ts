import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatComponent } from './edit-pat.component';

describe('EditPatComponent', () => {
  let component: EditPatComponent;
  let fixture: ComponentFixture<EditPatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
