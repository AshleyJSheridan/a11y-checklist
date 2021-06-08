import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {
	@Output() saveState: EventEmitter<Event> = new EventEmitter<Event>();
	@Output() loadState: EventEmitter<Event> = new EventEmitter<Event>();

	constructor() { }

	ngOnInit(): void {
	}

	save(event: Event): void {
		this.saveState.emit(event);
	}

	load(event: Event): void {
		this.loadState.emit(event);
	}
}
