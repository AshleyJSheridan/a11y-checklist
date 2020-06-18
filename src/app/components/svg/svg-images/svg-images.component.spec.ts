import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgImagesComponent } from './svg-images.component';

describe('SvgImagesComponent', () => {
  let component: SvgImagesComponent;
  let fixture: ComponentFixture<SvgImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
