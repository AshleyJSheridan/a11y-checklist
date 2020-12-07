import { Injectable } from "@angular/core";
@Injectable()
export class EnumHelper {
	getStringValuesFromEnum(enumObj: any): string[] {
		let enumStringValues: string[] = [];
		
		let enumKeys = Object.keys(enumObj);
		
		for(let enumKey of enumKeys) {
			if(isNaN(+enumKey)) {
				enumStringValues.push(enumKey);
			}
		}
		
		return enumStringValues;
	}
}
