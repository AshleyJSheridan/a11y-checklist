import { Component, OnInit, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { ConfirmModalOptions } from '../../../entities/confirm-modal-options';
import { KeyboardEventHandler } from '../../../entities/keyboard-event-handler';
import { KeyboardCodes } from '../../../enums/keyboard-codes';
import { KeyboardEventsHelper } from '../../../helpers/keyboard-events-helper';

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit {
	title: string;
	message: string;
	acceptLabel: string;
	cancelLabel: string;
	modalClass: string;
	focusExit: HTMLElement;
	private _showModal: boolean = false;
	private _window;
	private _elRef;
	private keyboardEventsHelper: KeyboardEventsHelper;
	private _focusDelay: number = 50;
	private _keyboardEvents: KeyboardEventHandler[] = [];
	@Output() confirmation: EventEmitter<any> = new EventEmitter();
	@HostListener('window:keydown', ['$event'])
	keyboardDownEvents(event: KeyboardEvent)
	{
		if(this.canShowModal()) {
			const matchedEvent = this.keyboardEventsHelper.getMatchedEvent(event, this._keyboardEvents);
			if(matchedEvent) {
				matchedEvent.call(this, event);
			}
		}
	}

	constructor(_elRef: ElementRef, keyboardEventsHelper: KeyboardEventsHelper) {
		this._window = window;
		this._elRef = _elRef;
		this.keyboardEventsHelper = keyboardEventsHelper;
	}

	ngOnInit(): void {
		this._keyboardEvents.push(new KeyboardEventHandler(KeyboardCodes.escape, this.no));
		this._keyboardEvents.push(new KeyboardEventHandler(KeyboardCodes.tab, this.focusAfterTabOut));
		this._keyboardEvents.push(new KeyboardEventHandler(KeyboardCodes.tab, this.focusAfterTabOut, true));
	}

	showConfirmation(options: ConfirmModalOptions): void {
		this._showModal = true;
		this.title = options.title;
		this.message = options.message;
		this.modalClass = options.modalClass;
		this.focusExit = options.focusExit;
		this.acceptLabel = options.acceptLabel;
		this.cancelLabel = options.cancelLabel;

		this.focusConfirmationModal();
	}

	canShowModal(): boolean {
		return this._showModal;
	}

	yes(event): void {
		this.takeActionAndCloseModal(event, true);
	}

	no(event): void {
		this.takeActionAndCloseModal(event, false);
	}

	takeActionAndCloseModal(event, userAction: boolean): void {
		event.stopPropagation();
		const response = {"userAction": userAction, "modalType": this.modalClass};

		this.confirmation.emit(response);

		this.closeModal();
	}

	closeModal(): void {
		this._showModal = false;
		this.focusExitPoint();
	}

	focusConfirmationModal(): void {
		if(this.canShowModal()) {
			const modal = this;

			const confirmationFocusTimeout = window.setTimeout(function() {
				const focusableElement = modal._elRef.nativeElement.querySelector('button.confirm-cancel');
				focusableElement.focus();
			}, this._focusDelay);
		}
	}

	focusAfterTabOut(event): void {
		const focusableElements = this._elRef.nativeElement.querySelectorAll('button');
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if(event.shiftKey && event.target === firstElement) {
			lastElement.focus();
			event.preventDefault();
		}

		if(!event.shiftKey && event.target === lastElement) {
			firstElement.focus();
			event.preventDefault();
		}
	}

	focusExitPoint(): void {
		const focusExit = this.focusExit;

		const confirmationFocusTimeout = this._window.setTimeout(function(){
			focusExit.focus();
		}, this._focusDelay);
	}
}
