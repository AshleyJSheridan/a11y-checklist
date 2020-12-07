import { Guideline } from './guideline';
import { GuidelineLevel } from '../enums/guideline-level.enum';
import { ContentType } from '../enums/content-type.enum';
import { CodeSnippet } from '../entities/code-snippet';

describe('Guideline', () => {
	let guideline: Guideline;
	let guidelineNumber: string = '1.2.3.4.5';
	let guidelineName: string = 'some guideline';
	let longDescription: string = 'some long description';
	let contentTypes: ContentType[];
	let codeSnippets: CodeSnippet[];
	
	beforeEach(() => {
		guideline = new Guideline(
			GuidelineLevel.AA,
			guidelineNumber,
			guidelineName,
			longDescription,
			contentTypes,
			codeSnippets
		);
	});
	
	it('should create an instance', () => {
		expect(guideline).toBeTruthy();
	});
});
