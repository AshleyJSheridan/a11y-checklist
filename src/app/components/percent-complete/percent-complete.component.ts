import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-percent-complete',
	templateUrl: './percent-complete.component.html'
})
export class PercentCompleteComponent implements OnInit {
	public chartRadius: number = 40;
	@Input() total: number;
	@Input() complete: number;
	
	constructor() { }

	ngOnInit(): void {
	}

	getPercentCompleted(): number {
		if (this.total === 0 || this.complete === 0)
			return 0;
			
		return Math.floor((this.complete / this.total) * 1000) / 10;
	}
	
	getChartCircumference(): number {
		return 2 * Math.PI * this.chartRadius;
	}
	
	getChartCompletePartialCircumference(): number {
		return this.getChartCircumference() * (this.getPercentCompleted() / 100);
	}
	
	getDashArray(): string {
		let gap = this.getChartCircumference();
		let completeCircumference = this.getChartCompletePartialCircumference();
		
		return `${completeCircumference} ${gap}`;
	}
}
