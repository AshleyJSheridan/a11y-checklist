import { Injectable } from '@angular/core';
import { KeyboardEventHandler } from '../entities/keyboard-event-handler';

@Injectable({
	providedIn: 'root'
})
export class KeyboardEventsHelper {
	getMatchedEvent(userEvent: KeyboardEvent, allEvents: KeyboardEventHandler[]) {
		let matchedEvent = null;

		allEvents.forEach(function(event){
			if(
				userEvent.keyCode === event.keycode &&
				userEvent.shiftKey === event.shiftKey &&
				userEvent.altKey === event.altKey &&
				userEvent.ctrlKey === event.ctrlKey &&
				userEvent.metaKey === event.metaKey
			) {
				matchedEvent = event.action;
				return;
			}
		});

		return matchedEvent;
	}
}
