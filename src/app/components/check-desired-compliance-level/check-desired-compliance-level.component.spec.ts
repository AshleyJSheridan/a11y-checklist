import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckDesiredComplianceLevelComponent } from './check-desired-compliance-level.component';

describe('CheckDesiredComplianceLevelComponent', () => {
  let component: CheckDesiredComplianceLevelComponent;
  let fixture: ComponentFixture<CheckDesiredComplianceLevelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckDesiredComplianceLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckDesiredComplianceLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
