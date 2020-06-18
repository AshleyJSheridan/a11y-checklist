import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgModalsComponent } from './svg-modals.component';

describe('SvgModalsComponent', () => {
  let component: SvgModalsComponent;
  let fixture: ComponentFixture<SvgModalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgModalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
