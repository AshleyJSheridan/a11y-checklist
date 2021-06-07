import { ConfirmModalOptions } from './confirm-modal-options';

describe('ConfirmModalOptions', () => {
	it('should create an instance', () => {
		const focusExitElement = document.createElement('button');
		const options = new ConfirmModalOptions('some title', 'some message', focusExitElement);

		expect(options).toBeTruthy();
	});
});
