import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgAudioComponent } from './svg-audio.component';

describe('SvgAudioComponent', () => {
  let component: SvgAudioComponent;
  let fixture: ComponentFixture<SvgAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
