import { Injectable } from '@angular/core';
import { Guideline } from '../entities/guideline';
import { LocalStorageHelper} from '../helpers/local-storage-helper';
import { SaveData } from '../entities/save-data';

@Injectable({
	providedIn: 'root'
})
export class SaveStateService {
	private localStorageHelper;

	constructor(localStorageHelper: LocalStorageHelper) { 
		this.localStorageHelper = localStorageHelper;
	}
	
	saveState(contentTypes: number[], complianceLevel: number, checkedGuidelines: Guideline[]): boolean {
		let guidelineNumbers = checkedGuidelines.map(g => g.guidelineNumber);
		
		let saveDataJson = new SaveData(contentTypes, complianceLevel, guidelineNumbers);
		let saveData = JSON.stringify(saveDataJson);
		
		return this.localStorageHelper.setItem('a11y-checklist', saveData);
	}
}
