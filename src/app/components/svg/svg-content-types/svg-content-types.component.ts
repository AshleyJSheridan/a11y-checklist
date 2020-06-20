import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-svg-content-types',
	templateUrl: './svg-content-types.component.html'
})
export class SvgContentTypesComponent implements OnInit {
	@Input() svgIcon: string;

	constructor() { }

	ngOnInit() {
	}

}
