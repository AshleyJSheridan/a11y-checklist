import { Component, OnInit } from '@angular/core';
import { ContentType } from '../../enums/content-type.enum';

@Component({
	selector: 'app-check-content-types',
	templateUrl: './check-content-types.component.html'
})
export class CheckContentTypesComponent implements OnInit {
	constructor() { 
		
	}

	ngOnInit() {
	}

	getContentTypes(): string[] {
		let types: string[] = [];
		
		let contentTypes = Object.keys(ContentType);
		
		for(let contentType of contentTypes) {
			if(isNaN(+contentType)) {
				types.push(contentType);
			}
		}
		
		return types;
	}
}
