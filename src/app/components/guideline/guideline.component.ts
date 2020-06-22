import { Component, OnInit, Input } from '@angular/core';
import { Guideline } from 'src/app/entities/guideline';
import { CodeSnippet } from 'src/app/entities/code-snippet';
import { ClipboardHelper } from 'src/app/helpers/clipboard-helper';

@Component({
	selector: 'app-guideline',
	templateUrl: './guideline.component.html',
	providers: [ClipboardHelper]
})
export class GuidelineComponent implements OnInit {
	private _clipboardHelper: ClipboardHelper;
	@Input() guideline: Guideline;

	constructor(clipboardHelper: ClipboardHelper) { 
		this._clipboardHelper = clipboardHelper;
	}

	ngOnInit() {
	}

	copyCode(event: any, codeSnippet: CodeSnippet): void {
		this._clipboardHelper.copyTextToClipboard(codeSnippet.code, event.target);
	}
}
