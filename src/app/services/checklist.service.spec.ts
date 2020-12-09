import { TestBed } from '@angular/core/testing';
import { GuidelineLevel } from '../enums/guideline-level.enum';
import { ContentType } from '../enums/content-type.enum';
import { ChecklistService } from './checklist.service';
import { Guideline } from '../entities/guideline';

describe('ChecklistService', () => {
	let service: ChecklistService;
	let guideline = new Guideline(
		GuidelineLevel.AA,
		'1.1.1',
		'guideline 1 name',
		'some description',
		[ContentType.Images],
		[]
	);
	
	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.get(ChecklistService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
	
	it('should get a list of guidelines which match content type and compliance level', () => {
		let contentType = [ContentType.Translations];
		let complianceLevel = GuidelineLevel.A;
		let matchingGuidelines = service.getMatchingGuidelines(contentType, complianceLevel);
		let expectedGuidelineNumbers = [
			'1.3.2', '1.3.3', '1.4.1', '2.1.1', '2.1.4', '2.4.1', '2.4.2', '2.4.3', '2.4.4', '2.5.1', '2.5.2', '2.5.3', '2.5.4',
			'3.1.1', '3.2.1', '3.3.1', '3.3.2', '4.1.1', '4.1.2'
		];

		expect(matchingGuidelines.length).toEqual(19);
		matchingGuidelines.forEach(function(guideline) {
			expect(expectedGuidelineNumbers.indexOf(guideline.guidelineNumber) > -1).toBeTruthy();
		});
	});
	
	it('should return false if the guideline does not match the content type', () => {
		spyOn(service, 'doesGuidelineMatchContentTypes').and.returnValue(false);
		spyOn(service, 'doesGuidelineMatchConformanceLevel').and.returnValue(true);
		
		expect(service.doesGuidelineMatchSelection(guideline)).toBeFalsy();
	});
	
	it('should return false if the guideline does not match the compliance level', () => {
		spyOn(service, 'doesGuidelineMatchContentTypes').and.returnValue(true);
		spyOn(service, 'doesGuidelineMatchConformanceLevel').and.returnValue(false);
		
		expect(service.doesGuidelineMatchSelection(guideline)).toBeFalsy();
	});
	
	it('should return false if the guideline does not match both the compliance level and the content type', () => {
		spyOn(service, 'doesGuidelineMatchContentTypes').and.returnValue(false);
		spyOn(service, 'doesGuidelineMatchConformanceLevel').and.returnValue(false);
		
		expect(service.doesGuidelineMatchSelection(guideline)).toBeFalsy();
	});
	
	it('should return true if the guideline matches both the compliance level and the content type', () => {
		spyOn(service, 'doesGuidelineMatchContentTypes').and.returnValue(true);
		spyOn(service, 'doesGuidelineMatchConformanceLevel').and.returnValue(true);
		
		expect(service.doesGuidelineMatchSelection(guideline)).toBeTruthy();
	});
	
	it('should return true if the conformance level matches the guideline level', () => {
		service.selectedGuidelineLevel = GuidelineLevel.AA;
		let guidelineLevel = GuidelineLevel.AA;
		
		expect(service.doesGuidelineMatchConformanceLevel(guidelineLevel)).toBeTruthy();
	});
	
	it('should return true if the conformance level is below that of the guideline level', () => {
		service.selectedGuidelineLevel = GuidelineLevel.AA;
		let guidelineLevel = GuidelineLevel.A;
		
		expect(service.doesGuidelineMatchConformanceLevel(guidelineLevel)).toBeTruthy();
	});
	
	it('should return false if the conformance level is above that of the guideline level', () => {
		service.selectedGuidelineLevel = GuidelineLevel.AA;
		let guidelineLevel = GuidelineLevel.AAA;
		
		expect(service.doesGuidelineMatchConformanceLevel(guidelineLevel)).toBeFalsy();
	});
	
	it('should return true if the guideline has no specific content types', () => {
		let contentTypes: ContentType[] = [];
		
		expect(service.doesGuidelineMatchContentTypes(contentTypes)).toBeTruthy();
	});
	
	it('should return true if the guideline has no specific content types', () => {
		let contentTypes: ContentType[] = [];
		
		expect(service.doesGuidelineMatchContentTypes(contentTypes)).toBeTruthy();
	});
	
	it('should return true if the guideline has at least one matching content type', () => {
		let contentTypes: ContentType[] = [ContentType.Images, ContentType.Audio];
		service.selectedContentTypes = [ContentType.Images, ContentType.Forms];
		
		expect(service.doesGuidelineMatchContentTypes(contentTypes)).toBeTruthy();
	});
	
	it('should return false if the guideline has no matching content types', () => {
		let contentTypes: ContentType[] = [ContentType.Images, ContentType.Audio];
		service.selectedContentTypes = [ContentType.Video, ContentType.Forms];
		
		expect(service.doesGuidelineMatchContentTypes(contentTypes)).toBeFalsy();
	});
});
