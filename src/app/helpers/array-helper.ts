import { Injectable } from "@angular/core";
@Injectable()
export class ArrayHelper {
	addToArray(baseArray: any[], elementToAdd: any): void {
		baseArray.push(elementToAdd);
	}
	
	removeFromArray(baseArray: any[], elementToRemove: any) {
		let existingIndex = baseArray.indexOf(elementToRemove);
		
		if(existingIndex > -1) {
			baseArray.splice(existingIndex, 1);
		}
	}
}
