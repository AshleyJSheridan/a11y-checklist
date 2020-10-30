import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ChecklistService } from '../../services/checklist.service';
import { Guidelines } from '../../entities/guidelines';
import { CheckContentTypesComponent } from '../check-content-types/check-content-types.component';
import { ContentType } from 'src/app/enums/content-type.enum';
import { GuidelinesComponent } from '../guidelines/guidelines.component';
import { GuidelineLevel } from 'src/app/enums/guideline-level.enum';
import { CheckDesiredComplianceLevelComponent } from '../check-desired-compliance-level/check-desired-compliance-level.component';

@Component({
	selector: 'app-check',
	templateUrl: './check.component.html'
})
export class CheckComponent implements OnInit {
	private _showResults: boolean = false;
	private _listParamsChanged: boolean = false;
	currentStep: number = 1;
	totalSteps: number = 3;
	@ViewChild(CheckContentTypesComponent) checkContentTypeComponent;
	@ViewChild(CheckDesiredComplianceLevelComponent) checkDesiredComplianceLevelComponent;
	@ViewChild(GuidelinesComponent) guidelinesComponent;

	constructor() { }

	ngOnInit() {
	}

	getSelectedContentTypes(): ContentType[] {
		return this.checkContentTypeComponent.getSelectedContentTypes();
	}
	
	getSelectedGuidelineLevel(): GuidelineLevel {
		return this.checkDesiredComplianceLevelComponent.getCurrentGuidelineLevel();
	}
	
	updateGuidelines(): void {
		this._listParamsChanged = false;
		let self = this;
		
		window.setTimeout(function(){
			self.guidelinesComponent.updateGuidelines();
		}, 0);
	}
	
	markListParamsChanged(event: any): void {
		this._listParamsChanged = true;
	}
	
	nextStep(event: any): void {
		this.currentStep ++;
		
		if (this.canShowResults()) {
			this.updateGuidelines();
		}
	}
	
	canShowResults(): boolean {
		return this.currentStep === this.totalSteps;
	}
	
	canShowStep(step: number): boolean {
		return this.currentStep === step;
	}
	
	getStepsAsArray(): number[] {
		return Array.from({length: 3}, (_, index) => index + 1);
	}
}
