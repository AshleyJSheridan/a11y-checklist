import {KeyboardEventsHelper} from './keyboard-events-helper';
import {KeyboardCodes} from "../enums/keyboard-codes";
import {KeyboardEventHandler} from "../entities/keyboard-event-handler";

describe('KeyboardEventsHelper', () => {
	it('should create an instance', () => {
		expect(new KeyboardEventsHelper()).toBeTruthy();
	});

	it('should return a matched event if one is found in the list of all events', () => {
		const userEvent = new KeyboardEvent('keydown', {keyCode: KeyboardCodes.escape});
		const allEvents = [
			new KeyboardEventHandler(KeyboardCodes.escape, 'escape action'),
			new KeyboardEventHandler(KeyboardCodes.tab, 'tab action'),
		];

		const helper = new KeyboardEventsHelper();
		expect(helper.getMatchedEvent(userEvent, allEvents)).toEqual('escape action');
	});

	it('should return null if no matched event is found in the list of all events', () => {
		const userEvent = new KeyboardEvent('keydown', {keyCode: KeyboardCodes.escape});
		const allEvents = [
			new KeyboardEventHandler(KeyboardCodes.tab, 'tab action'),
		];

		const helper = new KeyboardEventsHelper();
		expect(helper.getMatchedEvent(userEvent, allEvents)).toBeNull();
	});
});
