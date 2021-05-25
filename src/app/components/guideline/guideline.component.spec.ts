import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GuidelineComponent } from './guideline.component';
import { Guideline } from '../../entities/guideline';
import { GuidelineLevel } from '../../enums/guideline-level.enum';
import { CodeSnippet } from '../../entities/code-snippet';

describe('GuidelineComponent', () => {
	let component: GuidelineComponent;
	let fixture: ComponentFixture<GuidelineComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ GuidelineComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GuidelineComponent);
		component = fixture.componentInstance;
		component.guideline =  new Guideline(
			GuidelineLevel.A,
			'some guideline number',
			'some guideline name',
			'some description',
			[],
			[]
		);
		fixture.detectChanges();
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});

	it('should copy a code snippet', () => {
		let mockElement = document.createElement('div');
		let mockEvent = { target: mockElement };
		let codeSnippet = new CodeSnippet('some code', 'some description');

		spyOn(component['_clipboardHelper'], 'copyTextToClipboard');

		component.copyCode(mockEvent, codeSnippet);

		expect(component['_clipboardHelper'].copyTextToClipboard).toHaveBeenCalledWith('some code', mockElement);
	});

	it('should update the checked state to true if the element triggering the event was checked', () => {
		let mockEvent = { target: { checked: true } };

		spyOn(component.guideline, 'updateCheckedState');

		component.updateCheckedState(mockEvent);

		expect(component.guideline.updateCheckedState).toHaveBeenCalledWith(true);
	});

	it('should update the checked state to false if the element triggering the event was not checked', () => {
		let mockEvent = { target: { checked: false } };

		spyOn(component.guideline, 'updateCheckedState');

		component.updateCheckedState(mockEvent);

		expect(component.guideline.updateCheckedState).toHaveBeenCalledWith(false);
	});

	it('should return true if the guideline was checked', () => {
		component.guideline.checked = true;

		expect(component.isChecked()).toBeTruthy();
	});

	it('should return false if the guideline was not checked', () => {
		component.guideline.checked = false;

		expect(component.isChecked()).toBeFalsy();
	});
});
