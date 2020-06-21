import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ChecklistService } from '../../services/checklist.service';
import { Guidelines } from '../../entities/guidelines';
import { CheckContentTypesComponent } from '../check-content-types/check-content-types.component';
import { ContentType } from 'src/app/enums/content-type.enum';
import { GuidelinesComponent } from '../guidelines/guidelines.component';

@Component({
	selector: 'app-check',
	templateUrl: './check.component.html'
})
export class CheckComponent implements AfterViewInit {
	private _checklistService: ChecklistService;
	@ViewChild(CheckContentTypesComponent) checkContentTypeComponent;
	@ViewChild(GuidelinesComponent) guidelinesComponent;

	constructor(checklistService: ChecklistService) { 
		this._checklistService = checklistService;
	}

	ngAfterViewInit() {
		
		//console.log(this.checkContentTypeComponent);
		//console.log(this._checklistService.getMatchingGuidelines())
	}

	getSelectedContentTypes(): ContentType[] {
		return this.checkContentTypeComponent.getSelectedContentTypes();
	}
	
	updateGuidelines(event: any): void {
		this.guidelinesComponent.updateGuidelines();
	}
}
