import { Component, OnInit, Input } from '@angular/core';
import { Guideline } from 'src/app/entities/guideline';

@Component({
	selector: 'app-guideline',
	templateUrl: './guideline.component.html'
})
export class GuidelineComponent implements OnInit {
	@Input() guideline: Guideline;

	constructor() { }

	ngOnInit() {
	}

}
