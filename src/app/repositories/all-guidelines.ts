import { Injectable } from '@angular/core';
import { Guideline } from '../entities/guideline';
import { GuidelineLevel } from '../enums/guideline-level.enum';
import { ContentType } from '../enums/content-type.enum';

@Injectable({
	providedIn: 'root'
})
export class AllGuidelines {
	availableGuidelines: Guideline[] = [
		new Guideline(
			GuidelineLevel.A,
			'1.1.1',
			'Text Alternatives',
			'Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.',
			`long description`,
			[ContentType.Audio, ContentType.Images, ContentType.Video]
		),
		new Guideline(
			GuidelineLevel.AA,
			'1.2.4',
			'Captions (Live)',
			'Captions are provided for all live audio content in synchronized media.',
			'long description',
			[ContentType.Audio, ContentType.Video]
		),
	];
}
