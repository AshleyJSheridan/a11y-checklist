import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgTranslationsComponent } from './svg-translations.component';

describe('SvgTranslationsComponent', () => {
  let component: SvgTranslationsComponent;
  let fixture: ComponentFixture<SvgTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgTranslationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
