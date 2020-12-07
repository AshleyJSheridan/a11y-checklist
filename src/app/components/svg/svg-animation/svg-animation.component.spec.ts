import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SvgAnimationComponent } from './svg-animation.component';

describe('SvgAnimationComponent', () => {
  let component: SvgAnimationComponent;
  let fixture: ComponentFixture<SvgAnimationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
