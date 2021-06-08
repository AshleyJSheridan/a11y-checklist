import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick, inject } from '@angular/core/testing';
import { CheckComponent } from './check.component';
import { CheckContentTypesComponent } from '../check-content-types/check-content-types.component';
import { CheckDesiredComplianceLevelComponent } from '../check-desired-compliance-level/check-desired-compliance-level.component';
import { GuidelinesComponent } from '../guidelines/guidelines.component';
import { ContentType } from '../../enums/content-type.enum';
import { GuidelineLevel } from '../../enums/guideline-level.enum';
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
import { SaveStateService } from '../../services/save-state.service';
import { NotificationComponent } from '../notification/notification.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { Guideline } from '../../entities/guideline';
import { ElementRef } from '@angular/core';
import { MockElementRef } from '../../mocks/mock-element-ref';
import { EnumHelper } from '../../helpers/enum-helper';
import { ArrayHelper } from '../../helpers/array-helper';
import { SaveData } from '../../entities/save-data';
import { ConfirmComponent } from '../prompts/confirm/confirm.component';

describe('CheckComponent', () => {
	let component: CheckComponent;
	let fixture: ComponentFixture<CheckComponent>;
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
			declarations: [
				CheckComponent, CheckContentTypesComponent, CheckDesiredComplianceLevelComponent, GuidelinesComponent,
				SvgContentTypesComponent, SvgAnimationComponent, SvgAudioComponent, SvgFormsComponent, SvgImagesComponent,
				SvgModalsComponent, SvgTimedComponentsComponent, SvgTranslationsComponent, SvgVideoComponent, NotificationComponent,
				ToolbarComponent, ConfirmComponent
			],
			providers: [
				GuidelinesComponent, CheckComponent, NotificationComponent, CheckContentTypesComponent, EnumHelper, ArrayHelper,
				CheckDesiredComplianceLevelComponent, ConfirmComponent,
				{ provide: ElementRef, useClass: MockElementRef }
			]
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
		const contentTypes = [ContentType.Animation, ContentType.Audio];

		spyOn(component.checkContentTypeComponent, 'getSelectedContentTypes').and.returnValue(contentTypes);

		const selectedTypes = component.getSelectedContentTypes();

		expect(component.checkContentTypeComponent.getSelectedContentTypes).toHaveBeenCalled();
		expect(selectedTypes).toEqual(contentTypes);
	});

	it('should request the selected compliance level', () => {
		const complianceLevel = GuidelineLevel.AA;

		spyOn(component.checkDesiredComplianceLevelComponent, 'getCurrentGuidelineLevel').and.returnValue(complianceLevel);

		const selectedComplianceLevel = component.getSelectedGuidelineLevel();

		expect(component.checkDesiredComplianceLevelComponent.getCurrentGuidelineLevel).toHaveBeenCalled();
		expect(selectedComplianceLevel).toEqual(complianceLevel);
	});

	it('should update the shown guidelines', fakeAsync(() => {
		const guidelinesComponent = jasmine.createSpyObj('GuidelinesComponent', ['updateGuidelines']);
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
		const steps = component.getStepsAsArray();

		expect(steps).toEqual([1, 2, 3]);
	});

	it('should stop default event handling and move to specified step', () => {
		const event = new MockEvent();
		component.currentStep = 3;

		component.goBackToStep(1, event);

		expect(component.currentStep).toBe(1);
	});

	it('should save state and show success notification',
		inject([CheckComponent, SaveStateService], (component: CheckComponent, service: SaveStateService) => {
			const event = new MockEvent();

			spyOn(component, 'getSelectedContentTypes').and.returnValue([1, 2, 3]);
			spyOn(component, 'getSelectedGuidelineLevel').and.returnValue(2);
			spyOn(component, 'getCheckedGuidelines').and.returnValue([]);
			spyOn(service, 'saveState').and.returnValue(true);
			spyOn(component, 'showNotification');

			component.saveStateConfirm(event);

			expect(service.saveState).toHaveBeenCalledWith([1, 2, 3], 2, []);
			expect(component.showNotification).toHaveBeenCalledWith('success', 'Save complete');
		})
	);

	it('should save state and show success notification',
		inject([CheckComponent, SaveStateService], (component: CheckComponent, service: SaveStateService) => {
			const event = new MockEvent();

			spyOn(component, 'getSelectedContentTypes').and.returnValue([1, 2, 3]);
			spyOn(component, 'getSelectedGuidelineLevel').and.returnValue(2);
			spyOn(component, 'getCheckedGuidelines').and.returnValue([]);
			spyOn(service, 'saveState').and.returnValue(false);
			spyOn(component, 'showNotification');

			component.saveStateConfirm(event);

			expect(service.saveState).toHaveBeenCalledWith([1, 2, 3], 2, []);
			expect(component.showNotification).toHaveBeenCalledWith('error', 'There was a problem saving your current state');
		})
	);

	it('should get the list of checked off guidelines from the guidelines component',
		inject([CheckComponent, GuidelinesComponent], (component: CheckComponent, guidelinesComponent: GuidelinesComponent) => {
			component.guidelinesComponent = guidelinesComponent;

			spyOn(guidelinesComponent, 'getCheckedGuidelines').and.returnValue([guideline1, guideline2, guideline3]);

			expect(component.getCheckedGuidelines()).toEqual([guideline1, guideline2, guideline3]);
		})
	);

	it('should get the list of checked off guidelines from the guidelines component',
		inject([CheckComponent, NotificationComponent], (component: CheckComponent, notificationComponent: NotificationComponent) => {
			component.notificationComponent = notificationComponent;

			spyOn(notificationComponent, 'showNotification');

			component.showNotification('some type', 'some message');

			expect(notificationComponent.showNotification).toHaveBeenCalledWith('some type', 'some message');
		})
	);

	it('should show a notification if there was no saved state found to restore',
		inject([CheckComponent, NotificationComponent, SaveStateService, CheckContentTypesComponent, CheckDesiredComplianceLevelComponent,
				GuidelinesComponent, ConfirmComponent],
			(component: CheckComponent, notificationComponent: NotificationComponent, saveStateService: SaveStateService,
			 checkContentTypeComponent: CheckContentTypesComponent, checkDesiredComplianceLevelComponent: CheckDesiredComplianceLevelComponent,
			 guidelinesComponent: GuidelinesComponent, confirmComponent: ConfirmComponent) => {

			const event = new MockEvent();

			component.notificationComponent = notificationComponent;
			component.checkContentTypeComponent = checkContentTypeComponent;
			component.checkDesiredComplianceLevelComponent = checkDesiredComplianceLevelComponent;
			component.guidelinesComponent = guidelinesComponent;
			component.confirmComponent = confirmComponent;

			spyOn(saveStateService, 'hasSavedState').and.returnValue(false);
			spyOn(notificationComponent, 'showNotification');
			spyOn(checkContentTypeComponent, 'setContentTypesFromArray');
			spyOn(checkDesiredComplianceLevelComponent, 'setComplianceLevelFromInt');
			spyOn(guidelinesComponent, 'setCheckedGuidelines');

			component.loadStateConfirm(event);

			expect(notificationComponent.showNotification).toHaveBeenCalledWith('warn', 'No saved state to load');
			expect(checkContentTypeComponent.setContentTypesFromArray).not.toHaveBeenCalled();
			expect(checkDesiredComplianceLevelComponent.setComplianceLevelFromInt).not.toHaveBeenCalled();
			expect(guidelinesComponent.setCheckedGuidelines).not.toHaveBeenCalled();
		})
	);

	it('should restore state from saved data',
		inject([CheckComponent, NotificationComponent, SaveStateService, CheckContentTypesComponent, CheckDesiredComplianceLevelComponent,
				GuidelinesComponent, ConfirmComponent],
			(component: CheckComponent, notificationComponent: NotificationComponent, saveStateService: SaveStateService,
			 checkContentTypeComponent: CheckContentTypesComponent, checkDesiredComplianceLevelComponent: CheckDesiredComplianceLevelComponent,
			 guidelinesComponent: GuidelinesComponent, confirmComponent: ConfirmComponent) => {

				const event = new MockEvent();
				const savedState = new SaveData([1, 2, 3], 2, ['1.1.1']);

				component.notificationComponent = notificationComponent;
				component.checkContentTypeComponent = checkContentTypeComponent;
				component.checkDesiredComplianceLevelComponent = checkDesiredComplianceLevelComponent;
				component.guidelinesComponent = guidelinesComponent;
				component.confirmComponent = confirmComponent;

				spyOn(saveStateService, 'hasSavedState').and.returnValue(true);
				spyOn(saveStateService, 'getSavedState').and.returnValue(savedState);
				spyOn(notificationComponent, 'showNotification');
				spyOn(checkContentTypeComponent, 'setContentTypesFromArray');
				spyOn(checkDesiredComplianceLevelComponent, 'setComplianceLevelFromInt');
				spyOn(guidelinesComponent, 'setCheckedGuidelines');
				spyOn(component, 'getSelectedContentTypes').and.returnValue([1, 2, 3]);
				spyOn(component, 'getSelectedGuidelineLevel').and.returnValue(2);

				component.loadStateConfirm(event);

				expect(notificationComponent.showNotification).not.toHaveBeenCalled();
				expect(checkContentTypeComponent.setContentTypesFromArray).toHaveBeenCalledWith([1, 2, 3]);
				expect(checkDesiredComplianceLevelComponent.setComplianceLevelFromInt).toHaveBeenCalledWith(2);
				expect(guidelinesComponent.setCheckedGuidelines).toHaveBeenCalledWith(['1.1.1'], [1, 2, 3], 2);
				expect(component.currentStep).toEqual(3);
			})
	);

	it('should show a confirmation modal before loading a saved state over the current state',
		inject([CheckComponent, ConfirmComponent], (component: CheckComponent, confirmComponent: ConfirmComponent) => {
			const mockEvent = new Event('some event');
			component.confirmComponent = confirmComponent;

			spyOn(confirmComponent, 'showConfirmation');

			component.loadState(mockEvent);

			expect(confirmComponent.showConfirmation).toHaveBeenCalled();
		})
	);

	it('should do nothing if the user action was false', () => {
		const details = {userAction: false};

		spyOn(component, 'loadStateConfirm');

		component.confirmModalAction(details);

		expect(component.loadStateConfirm).not.toHaveBeenCalled();
	});

	it('should do nothing if the user action was true but the type had no associated action', () => {
		const details = {userAction: true, modalType: "some unknown type"};

		spyOn(component, 'loadStateConfirm');

		component.confirmModalAction(details);

		expect(component.loadStateConfirm).not.toHaveBeenCalled();
	});

	it('should call the load state confirm if user said yes to loading state', () => {
		const details = {userAction: true, modalType: "load-confirm"};

		spyOn(component, 'loadStateConfirm');

		component.confirmModalAction(details);

		expect(component.loadStateConfirm).toHaveBeenCalledWith(details);
	});

	it('should call the save state confirm if user said yes to saving state', () => {
		const details = {userAction: true, modalType: "save-confirm"};

		spyOn(component, 'saveStateConfirm');

		component.confirmModalAction(details);

		expect(component.saveStateConfirm).toHaveBeenCalledWith(details);
	});

	it('should save the state without showing a confirmation modal if there was no previously saved state',
		inject([CheckComponent, ConfirmComponent, SaveStateService], (component: CheckComponent, confirmComponent: ConfirmComponent, service: SaveStateService) => {
			const mockEvent = new Event('some event');
			component.confirmComponent = confirmComponent;

			spyOn(service, 'hasSavedState').and.returnValue(false);
			spyOn(confirmComponent, 'showConfirmation');
			spyOn(component, 'saveStateConfirm');

			component.saveState(mockEvent);

			expect(confirmComponent.showConfirmation).not.toHaveBeenCalled();
			expect(component.saveStateConfirm).toHaveBeenCalledWith(mockEvent);
		})
	);

	it('should show a confirmation modal if there was a previously saved state when the save button was pressed',
		inject([CheckComponent, ConfirmComponent, SaveStateService], (component: CheckComponent, confirmComponent: ConfirmComponent, service: SaveStateService) => {
			const mockEvent = new Event('some event');
			component.confirmComponent = confirmComponent;

			spyOn(service, 'hasSavedState').and.returnValue(true);
			spyOn(confirmComponent, 'showConfirmation');
			spyOn(component, 'saveStateConfirm');

			component.saveState(mockEvent);

			expect(confirmComponent.showConfirmation).toHaveBeenCalled();
			expect(component.saveStateConfirm).not.toHaveBeenCalledWith(mockEvent);
		})
	);
});
