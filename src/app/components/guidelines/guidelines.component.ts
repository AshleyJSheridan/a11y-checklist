import { Component, OnInit, Input } from '@angular/core';
import { ContentType } from 'src/app/enums/content-type.enum';
import { GuidelineLevel } from 'src/app/enums/guideline-level.enum';

@Component({
	selector: 'app-guidelines',
	templateUrl: './guidelines.component.html'
})
export class GuidelinesComponent implements OnInit {
	@Input() selectedContentTypes: ContentType[];
	@Input() guidelineLevel: GuidelineLevel;

	constructor() { }

	ngOnInit() { }

	updateGuidelines(): void {
		console.log(this.selectedContentTypes);
		console.log(this.guidelineLevel);
	}
}
