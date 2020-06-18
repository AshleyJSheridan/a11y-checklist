import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-check-desired-compliance-level',
	templateUrl: './check-desired-compliance-level.component.html'
})
export class CheckDesiredComplianceLevelComponent implements OnInit {
	levels: string[] = ['A', 'AA', 'AAA'];
	defaultLevel: string = 'AA';

	constructor() { }

	ngOnInit() {
	}

}
