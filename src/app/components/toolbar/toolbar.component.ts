import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {
	@Output() saveState: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() loadState: EventEmitter<Event> = new EventEmitter<Event>();

	constructor() { }

	ngOnInit(): void {
	}

	save(): void {
		this.saveState.emit(true);
	}

	load(event: Event): void {
		this.loadState.emit(event);
	}
}
