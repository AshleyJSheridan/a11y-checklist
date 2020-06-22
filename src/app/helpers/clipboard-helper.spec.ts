import { TestBed, inject } from '@angular/core/testing';
import { ClipboardHelper } from './clipboard-helper';

describe('ClipboardHelper', () => {
	let textToCopy: string = 'some text';
	let triggerElement = document.createElement('button');
	let triggerParent = document.createElement('div');
	triggerParent.appendChild(triggerElement);

	let mockTextArea = {
		setAttribute: function(attribute, value){},
		select: function(){},
		value: ''
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ClipboardHelper]
		});
	});

	it('should be created',
		inject([ClipboardHelper], (clipboardHelper: ClipboardHelper) => {
			expect(clipboardHelper).toBeTruthy();
		}
	));

	it('should copy text using a textarea and the execCommand function',
		inject([ClipboardHelper], (clipboardHelper: ClipboardHelper) => {
			spyOn(clipboardHelper, 'createTextarea').and.returnValue(mockTextArea);
			spyOn(clipboardHelper, 'addTextareaToPage');
			spyOn(mockTextArea, 'select');
			spyOn(document, 'execCommand');
			spyOn(clipboardHelper, 'removeTextareaFromPage');

			clipboardHelper.copyTextToClipboard(textToCopy, triggerElement);

			expect(clipboardHelper.createTextarea).toHaveBeenCalledWith(textToCopy);
			expect(clipboardHelper.addTextareaToPage).toHaveBeenCalledWith(mockTextArea, triggerElement);
			expect(mockTextArea.select).toHaveBeenCalled();
			expect(document.execCommand).toHaveBeenCalledWith('copy');
			expect(clipboardHelper.removeTextareaFromPage).toHaveBeenCalledWith(mockTextArea, triggerElement);
		}
	));

	it('should create a textarea element and make it hidden but available for browsers to select text',
		inject([ClipboardHelper], (clipboardHelper: ClipboardHelper) => {
			spyOn(document, 'createElement').and.returnValue(mockTextArea);
			spyOn(mockTextArea, 'setAttribute');

			clipboardHelper.createTextarea(textToCopy);

			expect(document.createElement).toHaveBeenCalledWith('textarea');
			expect(mockTextArea.setAttribute).toHaveBeenCalledWith('aria-hidden', 'true');
			expect(mockTextArea.setAttribute).toHaveBeenCalledWith('class', 'accessible-hidden');
			expect(mockTextArea.value).toEqual(textToCopy);
		}
	));

	it('should append a textarea to the body',
		inject([ClipboardHelper], (clipboardHelper: ClipboardHelper) => {
			let textarea = document.createElement('textarea');

			spyOn(triggerElement.parentNode, 'insertBefore');

			clipboardHelper.addTextareaToPage(textarea, triggerElement);

			expect(triggerElement.parentNode.insertBefore).toHaveBeenCalledWith(textarea, triggerElement);
		}
	));

	it('should remove a textarea from the body',
		inject([ClipboardHelper], (clipboardHelper: ClipboardHelper) => {
			let textarea = document.createElement('textarea');

			spyOn(triggerElement.parentNode, 'removeChild');

			clipboardHelper.removeTextareaFromPage(textarea, triggerElement);

			expect(triggerElement.parentNode.removeChild).toHaveBeenCalledWith(textarea);
		}
	));
});
