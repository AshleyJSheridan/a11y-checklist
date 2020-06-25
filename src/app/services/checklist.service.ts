import { Injectable } from '@angular/core';
import { Guideline } from '../entities/guideline';
import { GuidelineLevel } from '../enums/guideline-level.enum';
import { ContentType } from '../enums/content-type.enum';
import { AllGuidelines } from '../repositories/all-guidelines';

@Injectable({
	providedIn: 'root'
})
export class ChecklistService {
	guidelines: Guideline[] = [];
	selectedContentTypes: ContentType[];
	selectedGuidelineLevel: GuidelineLevel;
	private _availableGuidelines: AllGuidelines;

	constructor(availableGuidelines: AllGuidelines) {
		this._availableGuidelines = availableGuidelines;
	}
	
	getMatchingGuidelines(contentTypes: ContentType[], complianceLevel: GuidelineLevel): Guideline[] {
		this.selectedContentTypes = contentTypes;
		this.selectedGuidelineLevel = complianceLevel;
		
		this.guidelines = this._availableGuidelines.availableGuidelines.filter(this.doesGuidelineMatchSelection, this);
		
		return this.guidelines;
	}
	
	doesGuidelineMatchSelection(guideline: Guideline): boolean {
		let guidelineMatch = this.doesGuidelineMatchConformanceLevel(guideline.level);
		let contentMatch = this.doesGuidelineMatchContentTypes(guideline.testAgainst)
		
		return guidelineMatch && contentMatch;
	}
	
	doesGuidelineMatchConformanceLevel(level: GuidelineLevel): boolean {
		return level <= this.selectedGuidelineLevel;
	}
	
	doesGuidelineMatchContentTypes(contentTypes: ContentType[]): boolean {
		if(contentTypes.length === 0)
			return true;
		
		let matchingContentTypes = this.selectedContentTypes.filter(value => contentTypes.includes(value));
		
		return matchingContentTypes.length > 0;
	}
}
