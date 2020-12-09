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
	
	it('should get the guideline label', () => {
		let expectedLabel = `guideline-label-${guidelineNumber}`;
		expect(guideline.getLabel()).toEqual(expectedLabel);
	});
	
	it('the checked state of the guideline should initially be false', () => {
		expect(guideline.checked).toBeFalsy();
	});
	
	it('should set the checked state to true', () => {
		guideline.updateCheckedState(true);
		
		expect(guideline.checked).toBeTruthy();
	});
	
	it('should set the checked state to false', () => {
		guideline.updateCheckedState(true);
		guideline.updateCheckedState(false);
		
		expect(guideline.checked).toBeFalsy();
	});
});
