import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDesiredComplianceLevelComponent } from './check-desired-compliance-level.component';

describe('CheckDesiredComplianceLevelComponent', () => {
  let component: CheckDesiredComplianceLevelComponent;
  let fixture: ComponentFixture<CheckDesiredComplianceLevelComponent>;

  beforeEach(async(() => {
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
