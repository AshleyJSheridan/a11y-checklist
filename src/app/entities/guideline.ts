import { GuidelineLevel } from '../enums/guideline-level.enum';
import { ContentType } from '../enums/content-type.enum';

export class Guideline {
	level: GuidelineLevel;
	guidelineNumber: string;
	guidelineName: string;
	shortDescription: string;
	longDescription: string;
	testAgainst: ContentType[];
	
	constructor(level: GuidelineLevel, guidelineNumber: string, guidelineName: string, shortDescription: string, longDescription: string, testAgainst: ContentType[]) {
		this.level = level;
		this.guidelineNumber = guidelineNumber;
		this.guidelineName = guidelineName;
		this.shortDescription = shortDescription;
		this.longDescription = longDescription;
		this.testAgainst = testAgainst;
	}
}
