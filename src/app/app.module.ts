import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CheckComponent } from './components/check/check.component';
import { CheckContentTypesComponent } from './components/check-content-types/check-content-types.component';
import { SvgAnimationComponent } from './components/svg/svg-animation/svg-animation.component';
import { SvgAudioComponent } from './components/svg/svg-audio/svg-audio.component';
import { SvgFormsComponent } from './components/svg/svg-forms/svg-forms.component';
import { SvgImagesComponent } from './components/svg/svg-images/svg-images.component';
import { SvgModalsComponent } from './components/svg/svg-modals/svg-modals.component';
import { SvgTimedComponentsComponent } from './components/svg/svg-timed-components/svg-timed-components.component';
import { SvgTranslationsComponent } from './components/svg/svg-translations/svg-translations.component';
import { SvgVideoComponent } from './components/svg/svg-video/svg-video.component';
import { CheckDesiredComplianceLevelComponent } from './components/check-desired-compliance-level/check-desired-compliance-level.component';
import { GuidelinesComponent } from './components/guidelines/guidelines.component';
import { SvgContentTypesComponent } from './components/svg/svg-content-types/svg-content-types.component';
import { GuidelineComponent } from './components/guideline/guideline.component';
import { GuidelineLevelPipe } from './pipes/guideline-level.pipe';
import { PercentCompleteComponent } from './components/percent-complete/percent-complete.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ConfirmComponent } from './components/prompts/confirm/confirm.component';
import { AppRoutingModule } from './app-routing.module';
import { HelpComponent } from './components/help/help.component';

@NgModule({
	declarations: [
		AppComponent,
		CheckComponent,
		CheckContentTypesComponent,
		SvgAnimationComponent,
		SvgAudioComponent,
		SvgFormsComponent,
		SvgImagesComponent,
		SvgModalsComponent,
		SvgTimedComponentsComponent,
		SvgTranslationsComponent,
		SvgVideoComponent,
		CheckDesiredComplianceLevelComponent,
		GuidelinesComponent,
		SvgContentTypesComponent,
		GuidelineComponent,
		GuidelineLevelPipe,
		PercentCompleteComponent,
  ToolbarComponent,
  NotificationComponent,
  ConfirmComponent,
  HelpComponent
	],
	imports: [
		BrowserModule,
  AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
