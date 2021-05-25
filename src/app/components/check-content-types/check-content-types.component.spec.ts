import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CheckContentTypesComponent } from './check-content-types.component';
import { ContentType } from '../../enums/content-type.enum';
import { SvgContentTypesComponent } from '../svg/svg-content-types/svg-content-types.component';
import { SvgAnimationComponent } from '../svg/svg-animation/svg-animation.component';
import { SvgAudioComponent } from '../svg/svg-audio/svg-audio.component';
import { SvgFormsComponent } from '../svg/svg-forms/svg-forms.component';
import { SvgImagesComponent } from '../svg/svg-images/svg-images.component';
import { SvgModalsComponent } from '../svg/svg-modals/svg-modals.component';
import { SvgTimedComponentsComponent } from '../svg/svg-timed-components/svg-timed-components.component';
import { SvgTranslationsComponent } from '../svg/svg-translations/svg-translations.component';
import { SvgVideoComponent } from '../svg/svg-video/svg-video.component';

describe('CheckContentTypesComponent', () => {
	let component: CheckContentTypesComponent;
	let fixture: ComponentFixture<CheckContentTypesComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [
				CheckContentTypesComponent, SvgContentTypesComponent, SvgAnimationComponent, SvgAudioComponent,
				SvgFormsComponent, SvgImagesComponent, SvgModalsComponent, SvgTimedComponentsComponent,
				SvgTranslationsComponent, SvgVideoComponent
			],
			providers: [ SvgContentTypesComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CheckContentTypesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});

	it('should get the content types as an array of strings', () => {
		const types = component.getAllContentTypes();
		const expectedTypes = ['Animation', 'Audio', 'Forms', 'Images', 'Modals', 'Timed', 'Translations', 'Video'];

		expect(types).toEqual(expectedTypes);
	});

	it('should toggle content types on', () => {
		const mockElement = { checked: true };
		const mockEvent = { target: mockElement };
		const contentType1 = 'Forms';
		const contentType2 = 'Video';
		const expectedTypes = [ContentType[contentType1], ContentType[contentType2]];

		component.toggleSelectedType(mockEvent, contentType1);
		component.toggleSelectedType(mockEvent, contentType2);

		const selectedTypes = component.getSelectedContentTypes();

		expect(selectedTypes).toEqual(expectedTypes);
	});

	it('should toggle content types off', () => {
		let mockElement = { checked: true };
		let mockEvent = { target: mockElement };
		const contentType1 = 'Forms';
		const contentType2 = 'Video';
		const expectedTypes = [];

		component.toggleSelectedType(mockEvent, contentType1);
		component.toggleSelectedType(mockEvent, contentType2);

		mockElement = { checked: false };
		mockEvent = { target: mockElement };

		component.toggleSelectedType(mockEvent, contentType1);
		component.toggleSelectedType(mockEvent, contentType2);

		const selectedTypes = component.getSelectedContentTypes();

		expect(selectedTypes).toEqual(expectedTypes);
	});

	it('should emit an event when the next step button is pressed', () => {
		spyOn(component.nextStep, 'emit');

		component.next();

		expect(component.nextStep.emit).toHaveBeenCalledWith(true);
	});

	it('should set the checked content types from a passed in array', () => {
		component.setContentTypesFromArray([1, 2, 3]);

		expect(component.getSelectedContentTypes()).toEqual([1, 2, 3]);
	});

	it('should return true if the passed in content type is checked', () => {
		component.setContentTypesFromArray([ContentType.Images, ContentType.Forms]);

		expect(component.isContentTypeChecked('Forms')).toBeTruthy();
	});

	it('should return false if the passed in content type is not checked', () => {
		component.setContentTypesFromArray([ContentType.Images, ContentType.Forms]);

		expect(component.isContentTypeChecked('Audio')).toBeFalsy();
	});

});
