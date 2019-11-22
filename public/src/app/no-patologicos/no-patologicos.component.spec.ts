import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPatologicosComponent } from './no-patologicos.component';

describe('NoPatologicosComponent', () => {
  let component: NoPatologicosComponent;
  let fixture: ComponentFixture<NoPatologicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoPatologicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPatologicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
