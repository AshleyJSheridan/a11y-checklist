import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ChecklistService } from '../../services/checklist.service';
import { Guidelines } from '../../entities/guidelines';
import { CheckContentTypesComponent } from '../check-content-types/check-content-types.component';
import { ContentType } from '../../enums/content-type.enum';
import { GuidelinesComponent } from '../guidelines/guidelines.component';
import { GuidelineLevel } from '../../enums/guideline-level.enum';
import { CheckDesiredComplianceLevelComponent } from '../check-desired-compliance-level/check-desired-compliance-level.component';
import { Guideline } from '../../entities/guideline';

@Component({
	selector: 'app-check',
	templateUrl: './check.component.html'
})
export class CheckComponent implements OnInit {
	private _showResults: boolean = false;
	currentStep: number = 1;
	totalSteps: number = 3;
	@ViewChild(CheckContentTypesComponent, { static: true }) checkContentTypeComponent;
	@ViewChild(CheckDesiredComplianceLevelComponent, { static: true }) checkDesiredComplianceLevelComponent;
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
		let self = this;
		
		window.setTimeout(function(){
			self.guidelinesComponent.updateGuidelines();
		}, 0);
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
	
	goBackToStep(step, event: any) {
		event.preventDefault();
		
		this.currentStep = step;
	}
	
	saveState(event: any): void {
		console.log(this.getSelectedContentTypes());
		console.log(this.getSelectedGuidelineLevel());
		console.log(this.getCheckedGuidelines());
	}
	
	getCheckedGuidelines(): Guideline[] {
		return this.guidelinesComponent.getCheckedGuidelines();
	}
}
