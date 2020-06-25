import { GuidelineLevel } from '../enums/guideline-level.enum';
import { ContentType } from '../enums/content-type.enum';
import { CodeSnippet } from './code-snippet';

export class Guideline {
	level: GuidelineLevel;
	guidelineNumber: string;
	guidelineName: string;
	longDescription: string;
	testAgainst: ContentType[];
	codeSnippets: CodeSnippet[];
	
	constructor(
		level: GuidelineLevel, 
		guidelineNumber: string,
		guidelineName: string, 
		longDescription: string, 
		testAgainst: ContentType[],
		codeSnippets: CodeSnippet[]
	) {
		this.level = level;
		this.guidelineNumber = guidelineNumber;
		this.guidelineName = guidelineName;
		this.longDescription = longDescription;
		this.testAgainst = testAgainst;
		this.codeSnippets = codeSnippets;
	}
	
	getLabel(): string {
		return `guideline-label-${this.guidelineNumber}`;
	}
}
