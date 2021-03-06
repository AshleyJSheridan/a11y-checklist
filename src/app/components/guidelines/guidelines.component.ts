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
	@Input() showGuidelines: boolean = false;

	constructor(checklistService: ChecklistService, elementRef: ElementRef) {
		this._checklistService = checklistService;
		this._elementRef = elementRef;
	}

	ngOnInit() { }

	updateGuidelines(): void {
		const selectedContentTypes = this.selectedContentTypes;
		const guidelineLevel = this.guidelineLevel;

		this.guidelines = this._checklistService.getMatchingGuidelines(selectedContentTypes, guidelineLevel);

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
		const self = this;

		window.setTimeout(function(){
			const firstInput = self._elementRef.nativeElement.querySelector('input');

			if(firstInput !== null) {
				firstInput.focus();
			}
		}, 0);
	}

	getCheckedGuidelines(): Guideline[] {
		return this.guidelines.filter(guideline => guideline.checked == true);
	}

	setCheckedGuidelines(checkedGuidelines: string[], selectedContentTypes, guidelineLevel) {
		const guidelines = this._checklistService.getMatchingGuidelines(selectedContentTypes, guidelineLevel);
		guidelines.forEach(function(guideline){
			if(checkedGuidelines.includes(guideline.guidelineNumber)) {
				guideline.checked = true;
			}
		});
		this.guidelines = guidelines;
	}

	canShowGuidelines(): boolean {
		return this.showGuidelines;
	}
}
