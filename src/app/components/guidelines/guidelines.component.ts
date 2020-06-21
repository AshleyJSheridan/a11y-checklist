import { Component, OnInit, Input } from '@angular/core';
import { ContentType } from 'src/app/enums/content-type.enum';

@Component({
	selector: 'app-guidelines',
	templateUrl: './guidelines.component.html'
})
export class GuidelinesComponent implements OnInit {
	@Input() selectedContentTypes: ContentType[];

	constructor() { }

	ngOnInit() { }

	updateGuidelines(): void {
		console.log(this.selectedContentTypes);
	}
}
