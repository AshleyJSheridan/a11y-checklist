import { inject, TestBed } from '@angular/core/testing';
import { SaveStateService } from './save-state.service';
import { LocalStorageHelper } from '../helpers/local-storage-helper';
import { Guideline } from '../entities/guideline';
import { GuidelineLevel } from '../enums/guideline-level.enum';
import { ContentType } from '../enums/content-type.enum';
import { SaveData } from '../entities/save-data';

describe('SaveStateService', () => {
	let service: SaveStateService;
	const guideline1 = new Guideline(
		GuidelineLevel.A,
		'1.1.1',
		'guideline 1 name',
		'some description',
		[],
		[]
	);
	const guideline2 = new Guideline(
		GuidelineLevel.AA,
		'2.1.1',
		'guideline 2 name',
		'some description',
		[],
		[]
	);
	const guideline3 = new Guideline(
		GuidelineLevel.AA,
		'2.1.2',
		'guideline 3 name',
		'some description',
		[],
		[]
	);

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(SaveStateService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should save the current state',
		inject([SaveStateService, LocalStorageHelper], (service: SaveStateService, localStorageHelper: LocalStorageHelper) => {
			guideline1.checked = true;
			const checkedGuidelines = [guideline1];
			const expectedJson = '{"contentTypes":[0,1],"complianceLevel":2,"checkedGuidelines":["1.1.1"]}';

			spyOn(localStorageHelper, 'setItem').and.returnValue(true);

			expect(service.saveState([ContentType.Animation, ContentType.Audio], GuidelineLevel.AA, checkedGuidelines)).toBeTruthy();
			expect(localStorageHelper.setItem).toHaveBeenCalledWith('a11y-checklist', expectedJson);
		})
	);

	it('should return true if saved state already exists',
		inject([SaveStateService, LocalStorageHelper], (service: SaveStateService, localStorageHelper: LocalStorageHelper) => {
			spyOn(localStorageHelper, 'hasItem').and.returnValue(true);

			expect(service.hasSavedState()).toBeTruthy();
		})
	);

	it('should return false if saved state does not already exist',
		inject([SaveStateService, LocalStorageHelper], (service: SaveStateService, localStorageHelper: LocalStorageHelper) => {
			spyOn(localStorageHelper, 'hasItem').and.returnValue(false);

			expect(service.hasSavedState()).toBeFalsy();
		})
	);

	it('should return null if saved state was not valid json',
		inject([SaveStateService, LocalStorageHelper], (service: SaveStateService, localStorageHelper: LocalStorageHelper) => {
			spyOn(localStorageHelper, 'getItem').and.returnValue('some invalid json');

			expect(service.getSavedState()).toBeNull();
		})
	);

	it('should return saved state',
		inject([SaveStateService, LocalStorageHelper], (service: SaveStateService, localStorageHelper: LocalStorageHelper) => {
			spyOn(localStorageHelper, 'getItem').and.returnValue('{"contentTypes": [1, 2, 3], "complianceLevel": 1, "checkedGuidelines": ["1.1.1"]}');

			expect(service.getSavedState() instanceof SaveData).toBeTruthy();
		})
	);
});
