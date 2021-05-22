import { ComponentFixture, TestBed, waitForAsync, async, fakeAsync, tick } from '@angular/core/testing';
import { GuidelinesComponent } from './guidelines.component';
import { ContentType } from '../../enums/content-type.enum';
import { GuidelineLevel } from '../../enums/guideline-level.enum';
import { Guideline } from '../../entities/guideline';
import { ElementRef } from '@angular/core';
import { MockElementRef } from '../../mocks/mock-element-ref';
import { PercentCompleteComponent } from '../percent-complete/percent-complete.component';

describe('GuidelinesComponent', () => {
	let component: GuidelinesComponent;
	let fixture: ComponentFixture<GuidelinesComponent>;
	let guideline1 = new Guideline(
		GuidelineLevel.A,
		'1.1.1',
		'guideline 1 name',
		'some description',
		[],
		[]
	);
	let guideline2 = new Guideline(
		GuidelineLevel.AA,
		'2.1.1',
		'guideline 2 name',
		'some description',
		[],
		[]
	);
	let guideline3 = new Guideline(
		GuidelineLevel.AA,
		'2.1.2',
		'guideline 3 name',
		'some description',
		[],
		[]
	);

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ GuidelinesComponent, PercentCompleteComponent ],
			providers: [ { provide: ElementRef, useClass: MockElementRef } ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GuidelinesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
	
	it('should update the list of guidelines', () => {
		component.selectedContentTypes = [ContentType.Images, ContentType.Forms];
		component.guidelineLevel = GuidelineLevel.AA;
		let guidelines = 
		
		spyOn(component['_checklistService'], 'getMatchingGuidelines').and.returnValues([guideline1, guideline2]);
		spyOn(component, 'focusFirstGuideline');
		
		component.updateGuidelines();
		
		expect(component['_checklistService'].getMatchingGuidelines).toHaveBeenCalledWith(
			[ContentType.Images, ContentType.Forms],
			GuidelineLevel.AA
		);
		expect(component.focusFirstGuideline).toHaveBeenCalled();
		expect(component.guidelines).toEqual([guideline1, guideline2]);
	});
	
	it('should return true if matching guidelines for the specified level are found', () => {
		component.guidelines = [guideline1, guideline2];
		
		expect(component.hasGuidelinesForLevel(1)).toBeTruthy();
	});
	
	it('should return false if no matching guidelines for the specified level are found', () => {
		component.guidelines = [guideline1, guideline2];
		
		expect(component.hasGuidelinesForLevel(3)).toBeFalsy();
	});
	
	it('should return the total number of guidelines', () => {
		component.guidelines = [guideline1, guideline2];
		
		expect(component.getTotalGuidelines()).toEqual(2);
	});
	
	it('should return the total number of checked guidelines', () => {
		component.guidelines = [guideline1, guideline2, guideline3];
		component.guidelines[0].checked = true;
		component.guidelines[1].checked = true;
		
		expect(component.getTotalCheckedGuidelines()).toEqual(2);
		
		// set these back to unchecked to ensure they are in an expected state for further tests
		component.guidelines[0].checked = false;
		component.guidelines[1].checked = false;
	});
	

	it('should focus the first guideline', fakeAsync(() => {
		let mockElement = { focus: function(){} };
		
		spyOn(component['_elementRef'].nativeElement, 'querySelector').and.returnValue(mockElement);
				
		component.focusFirstGuideline();
		
		tick();
		
		expect(component['_elementRef'].nativeElement.querySelector).toHaveBeenCalledWith('input');
	}));
});
