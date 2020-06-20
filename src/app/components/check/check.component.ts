import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ChecklistService } from '../../services/checklist.service';
import { Guidelines } from '../../entities/guidelines';
import { CheckContentTypesComponent } from '../check-content-types/check-content-types.component';

@Component({
	selector: 'app-check',
	templateUrl: './check.component.html'
})
export class CheckComponent implements AfterViewInit {
	private _checklistService: ChecklistService;
	@ViewChild(CheckContentTypesComponent) checkContentTypeComponent;

	constructor(checklistService: ChecklistService) { 
		this._checklistService = checklistService;
	}

	ngAfterViewInit() {
		//console.log(this.checkContentTypeComponent);
		//console.log(this._checklistService.getMatchingGuidelines())
	}

	
}
