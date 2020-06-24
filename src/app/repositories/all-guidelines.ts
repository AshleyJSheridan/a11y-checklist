import { Injectable } from '@angular/core';
import { Guideline } from '../entities/guideline';
import { GuidelineLevel } from '../enums/guideline-level.enum';
import { ContentType } from '../enums/content-type.enum';
import { CodeSnippet } from '../entities/code-snippet';

@Injectable({
	providedIn: 'root'
})
export class AllGuidelines {
	private _videoCaptionSnippet: CodeSnippet = new CodeSnippet('(() => {let vids = document.querySelectorAll("video");vids.forEach((vid) => {let t = vid.querySelectorAll("track[kind=subtitles], track[kind=captions], track[kind=descriptions]");if(t.length === 0){console.error(vid);}})})()', 'Find <code>&lt;video></code> elements without tracks marked as description, captions, or subtitles');
	private _audioCaptionSnippet: CodeSnippet = new CodeSnippet('(() => {let clips = document.querySelectorAll("audio");clips.forEach((clip) => {let t = clip.querySelectorAll("track[kind=subtitles], track[kind=captions], track[kind=descriptions]");if(t.length === 0){console.error(clip);}})})()', 'Find <code>&lt;audio></code> elements without tracks marked as description, captions, or subtitles');
	private _unlabelledFormElementsSnippet: CodeSnippet = new CodeSnippet('(() => {let inputs = document.querySelectorAll("input:not([type=submit]):not([type=reset]):not([type=button]):not([type=hidden]), select, textarea");inputs.forEach((input) => {let parentLabel = getParentOfType(input, "label");if(parentLabel !== false)return;let inputId = input.getAttribute("id");let associatedLabel = getElementWithAttributeValue("label", "for", inputId);if(!associatedLabel) {console.error(input);} else {let label = parentLabel ? parentLabel : associatedLabel;let labelDisplay = getComputedStyleForNode(label, "display");let labelVisibility = getComputedStyleForNode(label, "visibility");if (labelDisplay === "none" || labelVisibility === "hidden") {console.error(input);}}})})();function getParentOfType(childNode, type) {let node = childNode.parentNode;while (node !== null && node.tagName !== undefined) {if (node.tagName.toLowerCase() === type)return node;node = node.parentNode;}return false;}function getElementWithAttributeValue(elementType, attribute, attributeValue) {if (attributeValue === null)return false;var element = document.querySelector(elementType + "[" + attribute + "=" + attributeValue + "]");return element;}function getComputedStyleForNode(node, property) {var computedStyles = window.getComputedStyle(node);return computedStyles.getPropertyValue(property);}', 'Find form elements with no associated label, or labels hidden from screen readers');
	private _audioVideoCaptionsSnippet: CodeSnippet = new CodeSnippet('(() => {let clips = document.querySelectorAll("audio,video");clips.forEach((clip) => {let t = clip.querySelectorAll("track[kind=captions]");if(t.length === 0){console.error(clip);}})})()', 'Find <code>&lt;audio></code> and <code>&lt;video></code> elements without tracks marked as description');
	private _audioVideoDescriptionsSnippet: CodeSnippet = new CodeSnippet('(() => {let clips = document.querySelectorAll("audio,video");clips.forEach((clip) => {let t = clip.querySelectorAll("track[kind=descriptions]");if(t.length === 0){console.error(clip);}})})()', 'Find <code>&lt;audio></code> and <code>&lt;video></code> elements without tracks marked as description');
	
	availableGuidelines: Guideline[] = [
		new Guideline(
			GuidelineLevel.A,
			'1.1.1',
			'Text Alternatives',
			'Provide text alternatives for any non-text content.',
			`<p>All non-text content (e.g. images, videos, graphs, etc) should have a text alternative. Check that:</p>
			<ul>
				<li>Images have <code>alt</code> text</li>
				<li>Form controls have labels that are not hidden from assistive tech</li>
				<li>Videos and audio clips have text alternatives</li>
				<li>Animations (e.g. Canvas) should have text alternatives</li>
				<li>Decorative/purely visual elements are hidden from assisstive tech.</li>
			</ul>`,
			[ContentType.Audio, ContentType.Images, ContentType.Video, ContentType.Forms, ContentType.Animation],
			[
				new CodeSnippet('console.log(document.querySelectorAll("img:not([alt])"))', 'Find <code>&lt;img></code> tags without <code>alt</code> text'),
				this._videoCaptionSnippet,
				this._audioCaptionSnippet,
				this._unlabelledFormElementsSnippet,
			]
		),
		new Guideline(
			GuidelineLevel.A,
			'1.2.1',
			'Audio-only and Video-only (Prerecorded)',
			'Provide alternatives for pre-recorded audio and video.',
			`<p>All video and audio clips need equivalent alternative content. Check that:</p>
			<ul>
				<li>Video and audio clips have a description, caption, or subtitle tracks, or a text equivalent, such as a transcript</li>
				<li>Audio containing speech should be presented in non-stereo (i.e. can be heard in <em>both</em> earphones)</li>
				<li>Animations (e.g. Canvas) should have text alternatives</li>
			</ul>`,
			[ContentType.Audio, ContentType.Video, ContentType.Animation],
			[
				this._videoCaptionSnippet,
				this._audioCaptionSnippet,
			]
		),
		new Guideline(
			GuidelineLevel.A,
			'1.2.2',
			'Captions (Prerecorded)',
			'Provide captions for pre-recorded audio content.',
			`<p>All video and audio clips need equivalent alternative content. Check that:</p>
			<ul>
				<li>Video and audio clips have a description or a text equivalent, such as a transcript</li>
				<li>Audio containing speech should be presented in non-stereo (i.e. can be heard in <em>both</em> earphones)</li>
			</ul>`,
			[ContentType.Audio, ContentType.Video],
			[
				this._audioVideoCaptionsSnippet
			]
		),
		new Guideline(
			GuidelineLevel.A,
			'1.2.3',
			'Audio Description or Media Alternative (Prerecorded)',
			'Provide audio descriptions for pre-recorded video content.',
			`<p>Videos and animations that should have audio descriptions (or a text equivalent).</p>
			<p>For example, an animated graph tracking a change over time should have a corresponding audio clip or time-based descriptions to illustrate the same point. Avoid media types that do not offer ways to synchronise descriptions easily, such as animated <abbr title="Graphics Interchange Format">GIF</abbr>s</p>
			<ul>
				<li>Video and audio clips have a description or a text equivalent, such as a transcript</li>
				<li>Audio containing speech should be presented in non-stereo (i.e. can be heard in <em>both</em> earphones)</li>
			</ul>`,
			[ContentType.Audio, ContentType.Video, ContentType.Images],
			[
				this._audioVideoDescriptionsSnippet
			]
		),
		new Guideline(
			GuidelineLevel.AA,
			'1.2.4',
			'Captions (Live)',
			'Captions are provided for all live audio content in synchronized media.',
			'<p>Live audio streams should provide captions</p>',
			[ContentType.Audio, ContentType.Video],
			[
				this._audioVideoCaptionsSnippet
			]
		),
		new Guideline(
			GuidelineLevel.AA,
			'1.2.5',
			'Audio Description (Prerecorded)',
			'Provide audio descriptions for pre-recorded video content.',
			`<p>Videos and animations that should have audio descriptions (or a text equivalent).</p>
			<p>For example, an animated graph tracking a change over time should have a corresponding audio clip or time-based descriptions to illustrate the same point. Avoid media types that do not offer ways to synchronise descriptions easily, such as animated <abbr title="Graphics Interchange Format">GIF</abbr>s</p>
			<ul>
				<li>Video and audio clips have a description or a text equivalent, such as a transcript</li>
			</ul>`,
			[ContentType.Audio, ContentType.Video],
			[
				this._audioVideoDescriptionsSnippet
			]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'1.2.6',
			'Sign Language (Prerecorded)',
			'Provide sign language interpretation for all prerecorded audio content',
			`<p>Videos and audio clips should have provided sign language interpretation.</p>`,
			[ContentType.Audio, ContentType.Video],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'1.2.7',
			'Extended Audio Description (Prerecorded)',
			'Provide extended audio descriptions where standard audio descriptions are insufficient',
			`<p>Videos that do not allow enough time for audio descriptions to accurately convey the video content should automatically pause to allow the video to remain synchronised with the audio descriptions</p>`,
			[ContentType.Audio, ContentType.Video],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'1.2.8',
			'Media Alternative (Prerecorded)',
			'Provide alternatives for pre-recorded video content.',
			`<p>Videos and animations that should have audio descriptions (or a text equivalent).</p>
			<p>For example, an animated graph tracking a change over time should have a corresponding audio clip or time-based descriptions to illustrate the same point. Avoid media types that do not offer ways to synchronise descriptions easily, such as animated <abbr title="Graphics Interchange Format">GIF</abbr>s</p>
			<ul>
				<li>Video and audio clips have a description or a text equivalent, such as a transcript</li>
				<li>Audio containing speech should be presented in non-stereo (i.e. can be heard in <em>both</em> earphones)</li>
			</ul>`,
			[ContentType.Audio, ContentType.Video],
			[
				this._audioVideoDescriptionsSnippet
			]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'1.2.9',
			'Audio-only (Live)',
			'Provide alternatives for pre-recorded audio content.',
			`<p>Offer alternatives to live audio, such as a link to a script (if the audio is following one), or captions</p>`,
			[ContentType.Audio, ContentType.Video],
			[
				this._audioVideoCaptionsSnippet
			]
		),
		new Guideline(
			GuidelineLevel.A,
			'1.3.1',
			'Info and Relationships',
			'Ensure that the same meaning of your content is conveyed when a user perceives the content in a different form',
			`<p>Sighted users get a lot of context from the appearance of elements, but people who have problems with their site benefit from additional semantics and cues. You should ensure that you:</p>\n\
			<ul>
				<li>Use semantic markup and don't rely on styling <code>&lt;div></code> and <code>&lt;span></code> elements</li>
				<li>Where the right markup cannot be used, add the correct <code>role</code> attribute to help identify what it's meant to be</li>
				<li>Don't rely on colour alone to identify meaning. Red might indicate an error, but to someone who cannot see red, put the word 'error' (or similar) into the message to convey the same meaning</li>
				<li>Identify required fields with the <code>required</code> attribute, and not only with a symbol, and for sighted users that symbols meaning should be made clear and appear before the first usage</li>
				<li>All form elements should have labels. Checkboxes and radio buttons should have individual labels and should be grouped with a <code>&lt;fieldset></code></li>
				<li>Identify important landmarks by giving them accessible lables using <code>aria-labelledby</code> or <code>aria-label</code></li>
				<li>Avoid things like icon fonts as these just hide the real letter being used which a screen reader will read out, instead look to using other image forms. If you must use them, mark them up with <code>role="image"</code> or hide them from assistive tech</li>
			</ul>
			`,
			[ContentType.Forms, ContentType.Modals, ContentType.Images],
			[
				this._unlabelledFormElementsSnippet,
			]
		),
		new Guideline(
			GuidelineLevel.A,
			'1.3.2',
			'Meaningful Sequence',
			`The order of the content should make sense, and you should avoid using techniques of re-ordering content that is not understood by assistive tech`,
			`<p>If you have a need to change the visual order of content to something different than it appears in the <abbr title="Document Object Model">DOM</abbr>, try to avoid doing it in a way that assistive tech cannot understand. You should check that:</p>
			<ul>
				<li>Avoid deliberate bad ordering of content in the <abbr>DOM</abbr> just to use <code>float</code> to position it correctly visually</li>
				<li>Avoid using <abbr>flexbox</abbr> to change content order, as <a href="https://www.w3.org/TR/css-flexbox-1/#order-accessibility">screen readers (should) deliberately ignore this</a></li>
			</ul>
			<p>Test the content order by disabling all <abbr title="Cascading Style Sheets">CSS</abbr> and observing that the result is logical</p>`,
			[ContentType.Audio, ContentType.Forms, ContentType.Images, ContentType.Modals, ContentType.Video],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'1.3.3',
			'Sensory Characteristics',
			'Instructions or context for content should not rely on a particular sensory characteristic, e.g. colour, shape, relative location, etc',
			`<p>If you have instructions of contextual clues (e.g. a status indicator), you should avoid relying on sensory characteristics, as not all users can percieve these.</p>
			<ul>
				<li>Avoid referencing information by colour: e.g. using traffic light style dots to indicate availability status. Not everyone can see the dots or determine their colour</li>
				<li>Try not to refer to elements by their shape. For example, 'round button', or 'icon of two squares'.</li>
				<li>Don't refer to content by it's location (i.e. 'the paragraph above', or 'the menu on the left') as this both relies on a user reading from start to finish and can also break in languages that don't follow a left-to-right order</li>
				<li>If you have graphs or charts where the size of an element denotes its value you should also include the values in another accessible format, such as a table or list, for example</li>
			</ul>
			<p>Test the content order by disabling all <abbr title="Cascading Style Sheets">CSS</abbr> and observing that the result is logical</p>`,
			[ContentType.Audio, ContentType.Forms, ContentType.Images, ContentType.Modals, ContentType.Video],
			[]
		),
	];
}
