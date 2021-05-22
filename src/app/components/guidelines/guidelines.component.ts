import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ContentType } from '../../enums/content-type.enum';
import { GuidelineLevel } from '../../enums/guideline-level.enum';
import { Guideline } from '../../entities/guideline';
import { ChecklistService } from '../../services/checklist.service';

@Component({
	selector: 'app-guidelines',
	templateUrl: './guidelines.component.html'
})
export class GuidelinesComponent implements OnInit {
	private _checklistService: ChecklistService;
	private _elementRef: ElementRef;
	guidelines: Guideline[] = [];
	
	@Input() selectedContentTypes: ContentType[];
	@Input() guidelineLevel: GuidelineLevel;

	constructor(checklistService: ChecklistService, elementRef: ElementRef) {
		this._checklistService = checklistService;
		this._elementRef = elementRef;
	}

	ngOnInit() { }

	updateGuidelines(): void {
		let selectedContentType = this.selectedContentTypes;
		let guidelineLevel = this.guidelineLevel;
		
		this.guidelines = this._checklistService.getMatchingGuidelines(selectedContentType, guidelineLevel);
		
		this.focusFirstGuideline();
	}
	
	hasGuidelinesForLevel(level: number): boolean {
		return this.guidelines.filter(guideline => guideline.guidelineNumber.charAt(0) === level.toString()).length > 0;
	}
	
	getTotalGuidelines(): number {
		return this.guidelines.length;
	}
	
	getTotalCheckedGuidelines(): number {
		return this.guidelines.filter(guideline => guideline.checked == true).length;
	}
	
	focusFirstGuideline(): void {
		let self = this;
		
		window.setTimeout(function(){
			let firstInput = self._elementRef.nativeElement.querySelector('input');
			
			if(firstInput !== null) {
				firstInput.focus();
			}
		}, 0);
	}
}
