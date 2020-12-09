import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SvgContentTypesComponent } from './svg-content-types.component';
import { SvgAnimationComponent } from '../svg-animation/svg-animation.component';
import { SvgAudioComponent } from '../svg-audio/svg-audio.component';
import { SvgFormsComponent } from '../svg-forms/svg-forms.component';
import { SvgImagesComponent } from '../svg-images/svg-images.component';
import { SvgModalsComponent } from '../svg-modals/svg-modals.component';
import { SvgTimedComponentsComponent } from '../svg-timed-components/svg-timed-components.component';
import { SvgTranslationsComponent } from '../svg-translations/svg-translations.component';
import { SvgVideoComponent } from '../svg-video/svg-video.component';

describe('SvgContentTypesComponent', () => {
	let component: SvgContentTypesComponent;
	let fixture: ComponentFixture<SvgContentTypesComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ 
				SvgContentTypesComponent, SvgAnimationComponent, SvgAudioComponent, SvgFormsComponent,
				SvgImagesComponent, SvgModalsComponent, SvgTimedComponentsComponent, SvgTranslationsComponent,
				SvgVideoComponent
			 ],
			 schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SvgContentTypesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
