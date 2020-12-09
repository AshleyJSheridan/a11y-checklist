import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ContentType } from '../../enums/content-type.enum';
import { EnumHelper } from '../../helpers/enum-helper';
import { ArrayHelper } from '../../helpers/array-helper';

@Component({
	selector: 'app-check-content-types',
	templateUrl: './check-content-types.component.html',
	providers: [EnumHelper, ArrayHelper]
})
export class CheckContentTypesComponent implements OnInit {
	private _selectedTypes: ContentType[] = [];
	private _enumHelper: EnumHelper;
	private _arrayHelper: ArrayHelper;
	@Output() nextStep: EventEmitter<boolean> = new EventEmitter<boolean>();
	
	constructor(enumHelper: EnumHelper, arrayHelper: ArrayHelper) { 
		this._enumHelper = enumHelper;
		this._arrayHelper = arrayHelper;
	}

	ngOnInit() {
	}

	getAllContentTypes(): string[] {
		let types = this._enumHelper.getStringValuesFromEnum(ContentType);
		
		return types;
	}
	
	toggleSelectedType(event: any, contentTypeString: string): void {
		let contentType = ContentType[contentTypeString];
		let checked = event.target.checked;
		
		if(checked) {
			this._arrayHelper.addToArray(this._selectedTypes, contentType);
		} else {
			this._arrayHelper.removeFromArray(this._selectedTypes, contentType);
		}
	}
	
	getSelectedContentTypes(): ContentType[] {
		return this._selectedTypes;
	}
	
	next(): void {
		this.nextStep.emit(true);
	}
}
