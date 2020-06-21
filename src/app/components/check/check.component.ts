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
	private _checklistService: ChecklistService;
	@ViewChild(CheckContentTypesComponent) checkContentTypeComponent;
	@ViewChild(CheckDesiredComplianceLevelComponent) checkDesiredComplianceLevelComponent;
	@ViewChild(GuidelinesComponent) guidelinesComponent;

	constructor(checklistService: ChecklistService) { 
		this._checklistService = checklistService;
	}

	ngOnInit() {
	}

	getSelectedContentTypes(): ContentType[] {
		return this.checkContentTypeComponent.getSelectedContentTypes();
	}
	
	getSelectedGuidelineLevel(): GuidelineLevel {
		return this.checkDesiredComplianceLevelComponent.getCurrentGuidelineLevel();
	}
	
	updateGuidelines(event: any): void {
		let self = this;
		
		window.setTimeout(function(){
			self.guidelinesComponent.updateGuidelines();
		}, 0);
	}
}
