import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CheckDesiredComplianceLevelComponent } from './check-desired-compliance-level.component';
import { GuidelineLevel } from 'src/app/enums/guideline-level.enum';

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

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
	
	it('should get all guidance levels as an array of strings', () => {
		let levels = component.getAllGuidelineLevels();
		
		expect(levels).toEqual(['A', 'AA', 'AAA']);
	});
	
	it('should set the current compliance level', () => {
		let level = 'AAA';
		
		component.toggleSelectedComplianceLevel({}, level);
		
		expect(component.currentLevel).toEqual(GuidelineLevel[level]);
	});
	
	it('should get the current guideline level', () => {
		component.currentLevel = GuidelineLevel.A;
		
		expect(component.getCurrentGuidelineLevel()).toEqual(GuidelineLevel.A);
	});
	
	it('should emit an event when the next step button is pressed', () => {
		spyOn(component.nextStep, 'emit');
		
		component.next();
		
		expect(component.nextStep.emit).toHaveBeenCalledWith(true);
	});
});
