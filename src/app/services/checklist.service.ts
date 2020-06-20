import { Injectable } from '@angular/core';
import { Guidelines } from '../entities/guidelines';
import { GuidelineLevel } from '../enums/guideline-level.enum';
import { ContentType } from '../enums/content-type.enum';

@Injectable({
	providedIn: 'root'
})
export class ChecklistService {
	guidelines: Guidelines;

	constructor() { }
	
	getMatchingGuidelines(contentTypes: ContentType[], complianceLevel: GuidelineLevel) {
		
	}
}
