import { Injectable } from '@angular/core';
import { Guideline } from '../entities/guideline';
import { LocalStorageHelper} from '../helpers/local-storage-helper';
import { SaveData } from '../entities/save-data';

@Injectable({
	providedIn: 'root'
})
export class SaveStateService {
	private localStorageHelper;
	private storageKey: string = 'a11y-checklist';

	constructor(localStorageHelper: LocalStorageHelper) { 
		this.localStorageHelper = localStorageHelper;
	}
	
	saveState(contentTypes: number[], complianceLevel: number, checkedGuidelines: Guideline[]): boolean {
		let guidelineNumbers = checkedGuidelines.map(g => g.guidelineNumber);
		
		let saveDataJson = new SaveData(contentTypes, complianceLevel, guidelineNumbers);
		let saveData = JSON.stringify(saveDataJson);
		
		return this.localStorageHelper.setItem(this.storageKey, saveData);
	}
	
	hasSavedState(): boolean {
		return this.localStorageHelper.hasItem(this.storageKey);
	}
	
	getSavedState(): SaveData {
		try {
			let savedStateRaw = JSON.parse(this.localStorageHelper.getItem(this.storageKey));
			let savedState = new SaveData(savedStateRaw.contentTypes, savedStateRaw.complianceLevel, savedStateRaw.checkedGuidelines);
		
			return savedState;
		} catch(e){
			return null;
		}
	}
}
