import { ComponentFixture, TestBed, waitForAsync, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { GuidelinesComponent } from './guidelines.component';
import { ContentType } from '../../enums/content-type.enum';
import { GuidelineLevel } from '../../enums/guideline-level.enum';
import { Guideline } from '../../entities/guideline';
import { ElementRef } from '@angular/core';
import { MockElementRef } from '../../mocks/mock-element-ref';
import { PercentCompleteComponent } from '../percent-complete/percent-complete.component';
import { ChecklistService } from '../../services/checklist.service';

describe('GuidelinesComponent', () => {
	let component: GuidelinesComponent;
	let fixture: ComponentFixture<GuidelinesComponent>;
	const guideline1 = new Guideline(
		GuidelineLevel.A,
		'1.1.1',
		'guideline 1 name',
		'some description',
		[],
		[]
	);
	const guideline2 = new Guideline(
		GuidelineLevel.AA,
		'2.1.1',
		'guideline 2 name',
		'some description',
		[],
		[]
	);
	const guideline3 = new Guideline(
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
			providers: [ { provide: ElementRef, useClass: MockElementRef }, GuidelinesComponent ]
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
		const mockElement = { focus: function(){} };

		spyOn(component['_elementRef'].nativeElement, 'querySelector').and.returnValue(mockElement);

		component.focusFirstGuideline();

		tick();

		expect(component['_elementRef'].nativeElement.querySelector).toHaveBeenCalledWith('input');
	}));

	it('should mark the guidelines matching the passed in array of guideline numbers as checked',
		inject([GuidelinesComponent, ChecklistService], (component: GuidelinesComponent, service: ChecklistService) => {
			const guidelines = [guideline1, guideline2, guideline3];
			component.guidelines = guidelines;

			spyOn(service, 'getMatchingGuidelines').and.returnValue(guidelines);

			component.setCheckedGuidelines(['1.1.1', '2.1.1'], [ContentType.Images], GuidelineLevel.AA);

			expect(guideline1.checked).toBeTruthy();
			expect(guideline2.checked).toBeTruthy();
			expect(guideline3.checked).toBeFalsy();
		})
	);

	it('should return true if the app can show list of guidelines', () => {
		component.showGuidelines = true;

		expect(component.canShowGuidelines()).toBeTruthy();
	});

	it('should return false if the app cannot show list of guidelines', () => {
		component.showGuidelines = false;

		expect(component.canShowGuidelines()).toBeFalsy();
	});
});
