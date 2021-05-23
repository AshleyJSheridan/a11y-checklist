import { Component, OnInit, Input } from '@angular/core';
import { Guideline } from '../../entities/guideline';
import { CodeSnippet } from '../../entities/code-snippet';
import { ClipboardHelper } from '../../helpers/clipboard-helper';
import { GuidelineLevel } from '../../enums/guideline-level.enum';

@Component({
	selector: 'app-guideline',
	templateUrl: './guideline.component.html',
	providers: [ClipboardHelper]
})
export class GuidelineComponent implements OnInit {
	public GuidelineLevel = GuidelineLevel;
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

	updateCheckedState(event: any) {
		this.guideline.updateCheckedState(event.target.checked);
	}

	isChecked(): boolean {
		return this.guideline.checked;
	}
}
