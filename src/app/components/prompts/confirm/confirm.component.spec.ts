import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { ConfirmComponent } from './confirm.component';
import { KeyboardEventsHelper } from '../../../helpers/keyboard-events-helper';
import { ElementRef } from '@angular/core';
import { MockElementRef } from '../../../mocks/mock-element-ref';
import { ConfirmModalOptions } from '../../../entities/confirm-modal-options';

describe('ConfirmComponent', () => {
	let event;

	beforeEach(async(() => {
		event = new Event('some event');

		TestBed.configureTestingModule({
			declarations: [ ConfirmComponent ],
			providers: [
				ConfirmComponent, KeyboardEventsHelper,
				{ provide: ElementRef, useClass: MockElementRef }
			]
		})
		.compileComponents();
	}));

	it('should create a component instance',
		inject([ConfirmComponent], (confirmComponent: ConfirmComponent) => {
			expect(confirmComponent).toBeTruthy();
		})
	);

	it('should show a confirmation message',
		inject([ConfirmComponent], (confirmComponent: ConfirmComponent) => {
			const focusElement = document.createElement('button');
			const title = 'some title';
			const message = 'some message';
			const modalOptions = new ConfirmModalOptions(title, message, focusElement);

			spyOn(confirmComponent, 'focusConfirmationModal');

			confirmComponent.showConfirmation(modalOptions);

			expect(confirmComponent.canShowModal()).toBeTruthy();
			expect(confirmComponent.title).toEqual(title);
			expect(confirmComponent.message).toEqual(message);
			expect(confirmComponent.focusExit).toEqual(focusElement);
		})
	);

	it('should not be visible by default',
		inject([ConfirmComponent], (confirmComponent: ConfirmComponent) => {
			expect(confirmComponent.canShowModal()).toBeFalsy();
		})
	);

	it('should emit a true response and stop event propagation when the user clicked the yes button',
		inject([ConfirmComponent], (confirmComponent: ConfirmComponent) => {
			spyOn(confirmComponent, 'takeActionAndCloseModal');

			confirmComponent.yes(event);

			expect(confirmComponent.takeActionAndCloseModal).toHaveBeenCalledWith(event, true);
		})
	);

	it('should emit a false response and stop event propagation when the user clicked the no button',
		inject([ConfirmComponent], (confirmComponent: ConfirmComponent) => {
			spyOn(confirmComponent, 'takeActionAndCloseModal');

			confirmComponent.no(event);

			expect(confirmComponent.takeActionAndCloseModal).toHaveBeenCalledWith(event, false);
		})
	);

	it('should emit a response, stop event propagation and close the modal',
		inject([ConfirmComponent], (confirmComponent: ConfirmComponent) => {
			const yesResponse = true;
			const focusElement = document.createElement('button');
			const modalOptions = new ConfirmModalOptions('some title', 'some message', focusElement, 'some modal class');
			const response = {"userAction": yesResponse, "modalType": 'some modal class'};

			spyOn(event, 'stopPropagation');
			spyOn(confirmComponent.confirmation, 'emit');
			spyOn(confirmComponent, 'closeModal');
			spyOn(confirmComponent, 'focusConfirmationModal');

			confirmComponent.showConfirmation(modalOptions);
			confirmComponent.takeActionAndCloseModal(event, yesResponse);

			expect(event.stopPropagation).toHaveBeenCalled();
			expect(confirmComponent.confirmation.emit).toHaveBeenCalledWith(response);
			expect(confirmComponent.closeModal).toHaveBeenCalled();
		})
	);

	it('should not show the modal when it has been closed',
		inject([ConfirmComponent], (confirmComponent: ConfirmComponent) => {
			spyOn(confirmComponent, 'focusExitPoint');

			confirmComponent.closeModal();

			expect(confirmComponent.canShowModal()).toBeFalsy();
		})
	);

	it('should focus the element that triggered the confirmation modal when the modal has been closed',
		inject([ConfirmComponent], (confirmComponent: ConfirmComponent) => {
			spyOn(confirmComponent, 'focusExitPoint');

			confirmComponent.closeModal();

			expect(confirmComponent.focusExitPoint).toHaveBeenCalled();
		})
	);

	it('should focus the confirmation modal',
		inject([ConfirmComponent], (confirmComponent: ConfirmComponent) => {
			const focusElement = document.createElement('button');
			const modalOptions = new ConfirmModalOptions('some title', 'some message', focusElement);

			spyOn(confirmComponent, 'focusConfirmationModal');

			confirmComponent.showConfirmation(modalOptions);

			expect(confirmComponent.focusConfirmationModal).toHaveBeenCalledWith();
		})
	);

	it('should focus on the cancel button of the modal if the modal is visible',
		inject([ConfirmComponent, ElementRef], fakeAsync((confirmComponent: ConfirmComponent, elementRef: ElementRef) => {
			const cancelButton = document.createElement('button');

			spyOn(elementRef.nativeElement, 'querySelector').and.returnValue(cancelButton);
			spyOn(cancelButton, 'focus');
			spyOn(confirmComponent, 'canShowModal').and.returnValue(true);

			confirmComponent.focusConfirmationModal();

			tick(50);

			expect(cancelButton.focus).toHaveBeenCalled();
		}))
	);

	it('should do nothing if the modal is not visible but it was asked to be focused on',
		inject([ConfirmComponent, ElementRef], fakeAsync((confirmComponent: ConfirmComponent, elementRef: ElementRef) => {
			const cancelButton = document.createElement('button');

			spyOn(elementRef.nativeElement, 'querySelector').and.returnValue(cancelButton);
			spyOn(cancelButton, 'focus');
			spyOn(confirmComponent, 'canShowModal').and.returnValue(false);

			confirmComponent.focusConfirmationModal();

			tick(50);

			expect(cancelButton.focus).not.toHaveBeenCalled();
		}))
	);

	it('should go to the last button if shift-tab was pressed and focus is currently on the first button',
		inject([ConfirmComponent, ElementRef], fakeAsync((confirmComponent: ConfirmComponent, elementRef: ElementRef) => {
			const firstButton = document.createElement('button');
			const lastButton = document.createElement('button');
			const buttons = [firstButton, lastButton];
			const mockEvent = {target: firstButton, shiftKey: true, preventDefault: function(){}};

			spyOn(elementRef.nativeElement, 'querySelectorAll').and.returnValue(buttons);
			spyOn(lastButton, 'focus');
			spyOn(mockEvent, 'preventDefault');

			confirmComponent.focusAfterTabOut(mockEvent);

			expect(mockEvent.preventDefault).toHaveBeenCalled();
			expect(elementRef.nativeElement.querySelectorAll).toHaveBeenCalledWith('button');
			expect(lastButton.focus).toHaveBeenCalled();
		}))
	);

	it('should do nothing if shift-tab was pressed and focus is not currently on the first button',
		inject([ConfirmComponent, ElementRef], fakeAsync((confirmComponent: ConfirmComponent, elementRef: ElementRef) => {
			const firstButton = document.createElement('button');
			const lastButton = document.createElement('button');
			const buttons = [firstButton, lastButton];
			const mockEvent = {target: lastButton, shiftKey: true, preventDefault: function(){}};

			spyOn(elementRef.nativeElement, 'querySelectorAll').and.returnValue(buttons);
			spyOn(lastButton, 'focus');
			spyOn(mockEvent, 'preventDefault');

			confirmComponent.focusAfterTabOut(mockEvent);

			expect(mockEvent.preventDefault).not.toHaveBeenCalled();
			expect(elementRef.nativeElement.querySelectorAll).toHaveBeenCalledWith('button');
			expect(lastButton.focus).not.toHaveBeenCalled();
		}))
	);

	it('should go to the first button if tab was pressed and focus is currently on the last button',
		inject([ConfirmComponent, ElementRef], fakeAsync((confirmComponent: ConfirmComponent, elementRef: ElementRef) => {
			const firstButton = document.createElement('button');
			const lastButton = document.createElement('button');
			const buttons = [firstButton, lastButton];
			const mockEvent = {target: lastButton, shiftKey: false, preventDefault: function(){}};

			spyOn(elementRef.nativeElement, 'querySelectorAll').and.returnValue(buttons);
			spyOn(firstButton, 'focus');
			spyOn(mockEvent, 'preventDefault');

			confirmComponent.focusAfterTabOut(mockEvent);

			expect(mockEvent.preventDefault).toHaveBeenCalled();
			expect(elementRef.nativeElement.querySelectorAll).toHaveBeenCalledWith('button');
			expect(firstButton.focus).toHaveBeenCalled();
		}))
	);

	it('should do nothing if tab was pressed and focus is not currently on the last button',
		inject([ConfirmComponent, ElementRef], fakeAsync((confirmComponent: ConfirmComponent, elementRef: ElementRef) => {
			const firstButton = document.createElement('button');
			const lastButton = document.createElement('button');
			const buttons = [firstButton, lastButton];
			const mockEvent = {target: firstButton, shiftKey: false, preventDefault: function(){}};

			spyOn(elementRef.nativeElement, 'querySelectorAll').and.returnValue(buttons);
			spyOn(firstButton, 'focus');
			spyOn(mockEvent, 'preventDefault');

			confirmComponent.focusAfterTabOut(mockEvent);

			expect(mockEvent.preventDefault).not.toHaveBeenCalled();
			expect(elementRef.nativeElement.querySelectorAll).toHaveBeenCalledWith('button');
			expect(firstButton.focus).not.toHaveBeenCalled();
		}))
	);

	it('should focus on the element that triggered the modal to be opened',
		inject([ConfirmComponent], fakeAsync((confirmComponent: ConfirmComponent) => {
			const someElement = document.createElement('button');
			confirmComponent.focusExit = someElement;

			spyOn(someElement, 'focus');

			confirmComponent.focusExitPoint();

			tick(50);

			expect(someElement.focus).toHaveBeenCalled();
		}))
	);
});
