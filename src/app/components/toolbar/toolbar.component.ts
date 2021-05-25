import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {
	@Output() saveState: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() loadState: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit(): void {
	}

	save(): void {
		this.saveState.emit(true);
	}

	load(): void {
		this.loadState.emit(true);
	}
}
