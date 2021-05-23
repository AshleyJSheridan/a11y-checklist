import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ChecklistService } from '../../services/checklist.service';
import { Guidelines } from '../../entities/guidelines';
import { CheckContentTypesComponent } from '../check-content-types/check-content-types.component';
import { ContentType } from '../../enums/content-type.enum';
import { GuidelinesComponent } from '../guidelines/guidelines.component';
import { GuidelineLevel } from '../../enums/guideline-level.enum';
import { CheckDesiredComplianceLevelComponent } from '../check-desired-compliance-level/check-desired-compliance-level.component';
import { Guideline } from '../../entities/guideline';
import { SaveStateService } from '../../services/save-state.service';
import { LocalStorageHelper} from '../../helpers/local-storage-helper';

@Component({
	selector: 'app-check',
	templateUrl: './check.component.html',
	providers: [LocalStorageHelper, SaveStateService]
})
export class CheckComponent implements OnInit {
	private _showResults: boolean = false;
	private saveStateService;
	currentStep: number = 1;
	totalSteps: number = 3;
	@ViewChild(CheckContentTypesComponent, { static: true }) checkContentTypeComponent;
	@ViewChild(CheckDesiredComplianceLevelComponent, { static: true }) checkDesiredComplianceLevelComponent;
	@ViewChild(GuidelinesComponent) guidelinesComponent;

	constructor(saveStateService: SaveStateService) {
		this.saveStateService = saveStateService;
	}

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
		this.saveStateService.saveState(this.getSelectedContentTypes(), this.getSelectedGuidelineLevel(), this.getCheckedGuidelines());
	}
	
	getCheckedGuidelines(): Guideline[] {
		return this.guidelinesComponent.getCheckedGuidelines();
	}
}
