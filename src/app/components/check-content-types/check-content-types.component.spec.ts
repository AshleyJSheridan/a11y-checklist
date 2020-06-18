import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckContentTypesComponent } from './check-content-types.component';

describe('CheckContentTypesComponent', () => {
  let component: CheckContentTypesComponent;
  let fixture: ComponentFixture<CheckContentTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckContentTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckContentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
