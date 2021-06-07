export class ConfirmModalOptions {
	title: string;
	message: string;
	acceptLabel: string;
	cancelLabel: string;
	modalClass: string;
	focusExit: HTMLElement;

	constructor(title: string, message: string, focusExit: HTMLElement, modalClass: string = '',
		acceptLabel: string = 'Yes', cancelLabel: string = 'No', ) {

		this.title = title;
		this.message = message;
		this.focusExit = focusExit;
		this.acceptLabel = acceptLabel;
		this.cancelLabel = cancelLabel;
		this.modalClass = modalClass;
	}
}
