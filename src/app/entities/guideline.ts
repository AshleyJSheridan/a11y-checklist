import { GuidelineLevel } from '../enums/guideline-level.enum';
import { ContentType } from '../enums/content-type.enum';

export class Guideline {
	level: GuidelineLevel;
	guidelineNumber: string;
	guidelineName: string;
	shortDescription: string;
	longDescription: string;
	testAgainst: ContentType[];
	jsSnippets: string[];
	
	constructor(
		level: GuidelineLevel, 
		guidelineNumber: string,
		guidelineName: string, 
		shortDescription: string, 
		longDescription: string, 
		testAgainst: ContentType[],
		jsSnippets: string[]
	) {
		this.level = level;
		this.guidelineNumber = guidelineNumber;
		this.guidelineName = guidelineName;
		this.shortDescription = shortDescription;
		this.longDescription = longDescription;
		this.testAgainst = testAgainst;
		this.jsSnippets = jsSnippets;
	}
}
