import { KeyboardEventHandler } from './keyboard-event-handler';

describe('KeyboardEventHandler', () => {
	it('should create an instance with minimal params', () => {
		const handler = new KeyboardEventHandler(1, 'some action');

		expect(handler).toBeTruthy();
		expect(handler.keycode).toEqual(1);
		expect(handler.action).toEqual('some action');
	});

	it('should create an instance with all params', () => {
		const handler = new KeyboardEventHandler(1, 'some action', true, true, true, true);

		expect(handler).toBeTruthy();
		expect(handler.keycode).toEqual(1);
		expect(handler.action).toEqual('some action');
		expect(handler.shiftKey).toBeTruthy();
		expect(handler.altKey).toBeTruthy();
		expect(handler.ctrlKey).toBeTruthy();
		expect(handler.metaKey).toBeTruthy();
	});
});
