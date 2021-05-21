import { ComponentFixture, TestBed, waitForAsync, async, fakeAsync, tick } from '@angular/core/testing';
import { CheckComponent } from './check.component';
import { CheckContentTypesComponent } from '../check-content-types/check-content-types.component';
import { CheckDesiredComplianceLevelComponent } from '../check-desired-compliance-level/check-desired-compliance-level.component';
import { GuidelinesComponent } from '../guidelines/guidelines.component';
import { ContentType } from '../../enums/content-type.enum';
import { GuidelineLevel } from '../../enums/guideline-level.enum';
import { ElementRef } from '@angular/core';
import { SvgContentTypesComponent } from '../svg/svg-content-types/svg-content-types.component';
import { SvgAnimationComponent } from '../svg/svg-animation/svg-animation.component';
import { SvgAudioComponent } from '../svg/svg-audio/svg-audio.component';
import { SvgFormsComponent } from '../svg/svg-forms/svg-forms.component';
import { SvgImagesComponent } from '../svg/svg-images/svg-images.component';
import { SvgModalsComponent } from '../svg/svg-modals/svg-modals.component';
import { SvgTimedComponentsComponent } from '../svg/svg-timed-components/svg-timed-components.component';
import { SvgTranslationsComponent } from '../svg/svg-translations/svg-translations.component';
import { SvgVideoComponent } from '../svg/svg-video/svg-video.component';
import { MockEvent } from '../../mocks/mock-event';

describe('CheckComponent', () => {
	let component: CheckComponent;
	let fixture: ComponentFixture<CheckComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ 
				CheckComponent, CheckContentTypesComponent, CheckDesiredComplianceLevelComponent, GuidelinesComponent,
				SvgContentTypesComponent, SvgAnimationComponent, SvgAudioComponent, SvgFormsComponent, SvgImagesComponent,
				SvgModalsComponent, SvgTimedComponentsComponent, SvgTranslationsComponent, SvgVideoComponent
			],
			providers: [ GuidelinesComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CheckComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
	
	it('should request the selected content types', () => {
		let contentTypes = [ContentType.Animation, ContentType.Audio];
		
		spyOn(component.checkContentTypeComponent, 'getSelectedContentTypes').and.returnValue(contentTypes);
		
		let selectedTypes = component.getSelectedContentTypes();		
		
		expect(component.checkContentTypeComponent.getSelectedContentTypes).toHaveBeenCalled();
		expect(selectedTypes).toEqual(contentTypes);
	});
	
	it('should request the selected compliance level', () => {
		let complianceLevel = GuidelineLevel.AA;
		
		spyOn(component.checkDesiredComplianceLevelComponent, 'getCurrentGuidelineLevel').and.returnValue(complianceLevel);
		
		let selectedComplianceLevel = component.getSelectedGuidelineLevel();		
		
		expect(component.checkDesiredComplianceLevelComponent.getCurrentGuidelineLevel).toHaveBeenCalled();
		expect(selectedComplianceLevel).toEqual(complianceLevel);
	});
	
	it('should update the shown guidelines', fakeAsync(() => {
		let guidelinesComponent = jasmine.createSpyObj('GuidelinesComponent', ['updateGuidelines']);
		component.guidelinesComponent = guidelinesComponent;

		component.updateGuidelines();
		
		tick();
		fixture.detectChanges();
		
		fixture.whenStable().then(() => {
			expect(component.guidelinesComponent.updateGuidelines).toHaveBeenCalled();
		});
	}));
	
	it('should progress to the next step', () => {
		spyOn(component, 'canShowResults').and.returnValue(false);
		
		component.nextStep({});
		
		expect(component.currentStep).toBe(2);
	});
	
	it('should progress to the next step and update the guidelines', () => {
		spyOn(component, 'canShowResults').and.returnValue(true);
		spyOn(component, 'updateGuidelines');
		
		component.nextStep({});
		
		expect(component.currentStep).toBe(2);
		expect(component.updateGuidelines).toHaveBeenCalled();
	});
	
	it('should return false when not on the final step', () => {
		component.totalSteps = 10;
		component.currentStep = 5;
		
		expect(component.canShowResults()).toBeFalsy();
	});
	
	it('should return false when not on the final step', () => {
		component.totalSteps = 10;
		component.currentStep = 10;
		
		expect(component.canShowResults()).toBeTruthy();
	});
	
	it('should return false when the current step does not match the passed in step number', () => {
		component.currentStep = 5;
		
		expect(component.canShowStep(3)).toBeFalsy();
	});
	
	it('should return true when the current step matches the passed in step number', () => {
		component.currentStep = 5;
		
		expect(component.canShowStep(5)).toBeTruthy();
	});
	
	it('should get the current number of steps as an iterable array for the template', () => {
		let steps = component.getStepsAsArray();
		
		expect(steps).toEqual([1, 2, 3]);
	});
	
	it('should stop default event handling and move to specified step', () => {
		let event = new MockEvent();
		component.currentStep = 3;
		
		component.goBackToStep(1, event);
		
		expect(component.currentStep).toBe(1);
	});
});
