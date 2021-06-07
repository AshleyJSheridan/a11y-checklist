import { KeyboardCodes } from '../enums/keyboard-codes';

export class KeyboardEventHandler {
	keycode: KeyboardCodes;
	action: any;
	shiftKey: boolean;
	altKey: boolean;
	ctrlKey: boolean;
	metaKey: boolean;

	constructor(keyCode: KeyboardCodes, action: any, shiftKey: boolean = false, altKey: boolean = false,
		ctrlKey: boolean = false, metaKey: boolean = false) {

		this.keycode = keyCode;
		this.action = action;
		this.shiftKey = shiftKey;
		this.altKey = altKey;
		this.ctrlKey = ctrlKey;
		this.metaKey = metaKey;
	}
}
