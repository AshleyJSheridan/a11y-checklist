import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgFormsComponent } from './svg-forms.component';

describe('SvgFormsComponent', () => {
  let component: SvgFormsComponent;
  let fixture: ComponentFixture<SvgFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
