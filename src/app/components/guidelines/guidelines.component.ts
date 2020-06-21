import { Component, OnInit, Input } from '@angular/core';
import { ContentType } from 'src/app/enums/content-type.enum';
import { GuidelineLevel } from 'src/app/enums/guideline-level.enum';
import { Guideline } from 'src/app/entities/guideline';
import { ChecklistService } from 'src/app/services/checklist.service';

@Component({
	selector: 'app-guidelines',
	templateUrl: './guidelines.component.html'
})
export class GuidelinesComponent implements OnInit {
	private _checklistService: ChecklistService;
	guidelines: Guideline[] = [];
	
	@Input() selectedContentTypes: ContentType[];
	@Input() guidelineLevel: GuidelineLevel;

	constructor(checklistService: ChecklistService) {
		this._checklistService = checklistService;
	}

	ngOnInit() { }

	updateGuidelines(): void {
		let selectedContentType = this.selectedContentTypes;
		let guidelineLevel = this.guidelineLevel;
		
		this.guidelines = this._checklistService.getMatchingGuidelines(selectedContentType, guidelineLevel);
	}
}
