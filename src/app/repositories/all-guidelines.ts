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
	private _colourContrastSnippet: CodeSnippet = new CodeSnippet('(() => {let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);let textNode;while (textNode = walker.nextNode()) {var textContent = textNode.textContent.trim();if (textContent.length > 0) {var computedStyles = window.getComputedStyle(textNode.parentNode);var background = getColourFromComputed(computedStyles, "background-color");var foreground = getColourFromComputed(computedStyles, "color");var fontSize = parseInt(getPropertyFromComputedStyles(computedStyles, "font-size"));var fontWeight = getPropertyFromComputedStyles(computedStyles, "font-weight");var contrast = getColourContrast(background, foreground);if (!doesTextContrast(fontSize, fontWeight, contrast)) {console.error(textNode);}}}})();function getPropertyFromComputedStyles(computedStyles, property) {return computedStyles.getPropertyValue(property);}function getColourFromComputed(computedStyles, colourProperty) {var colour = getPropertyFromComputedStyles(computedStyles, colourProperty);var colourComponents;if (colour.match(/^rgba/)) {colourComponents = colour.match(/^rgba\\((\\d+), ?(\\d+), ?(\\d+), ?(\\d+)/);return convertRGBAtoRGB(colourComponents[1], colourComponents[2], colourComponents[3], colourComponents[4]);}colourComponents = colour.match(/^rgb\\((\\d+), ?(\\d+), ?(\\d+)/);return {r: parseInt(colourComponents[1]),g: parseInt(colourComponents[2]),b: parseInt(colourComponents[3])};}function convertRGBAtoRGB(r, g, b, alpha) {var defaultBackground = 255;return {r: (1 - alpha) * defaultBackground + alpha * r,g: (1 - alpha) * defaultBackground + alpha * g,b: (1 - alpha) * defaultBackground + alpha * b};}function getColourContrast(rgb1, rgb2) {var luminance1 = getColourLuminance(rgb1.r, rgb1.g, rgb1.b);var luminance2 = getColourLuminance(rgb2.r, rgb2.g, rgb2.b);return luminance1 / luminance2;}function getColourLuminance(r, g, b) {var a = [r, g, b].map(function (v) {v /= 255;return v <= .03928? v / 12.92: Math.pow((v + .055) / 1.055, 2.4);});return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * .0722 + .05;}function doesTextContrast(fontSize, fontWeight, contrast) {var minContrastLevel = 4.5;var largeTextContrastLevel = 3;var largeTextSize = 24;var largeTextSizeBold = 18.66;var boldTextWeight = 700;var passedMinContrast = contrast >= minContrastLevel;var isLargeText = (fontSize >= largeTextSize) || (fontWeight >= boldTextWeight && fontSize >= largeTextSizeBold);var passedLargeTextMinContrast = (isLargeText && contrast >= largeTextContrastLevel);return passedMinContrast || passedLargeTextMinContrast;}', 'Find text that does not contrast well enough with the background');
	private _colourContrastHighSnippet: CodeSnippet = new CodeSnippet('(() => {let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);let textNode;while (textNode = walker.nextNode()) {var textContent = textNode.textContent.trim();if (textContent.length > 0) {var computedStyles = window.getComputedStyle(textNode.parentNode);var background = getColourFromComputed(computedStyles, "background-color");var foreground = getColourFromComputed(computedStyles, "color");var fontSize = parseInt(getPropertyFromComputedStyles(computedStyles, "font-size"));var fontWeight = getPropertyFromComputedStyles(computedStyles, "font-weight");var contrast = getColourContrast(background, foreground);if (!doesTextContrast(fontSize, fontWeight, contrast)) {console.error(textNode);}}}})();function getPropertyFromComputedStyles(computedStyles, property) {return computedStyles.getPropertyValue(property);}function getColourFromComputed(computedStyles, colourProperty) {var colour = getPropertyFromComputedStyles(computedStyles, colourProperty);var colourComponents;if (colour.match(/^rgba/)) {colourComponents = colour.match(/^rgba\\((\\d+), ?(\\d+), ?(\\d+), ?(\\d+)/);return convertRGBAtoRGB(colourComponents[1], colourComponents[2], colourComponents[3], colourComponents[4]);}colourComponents = colour.match(/^rgb\\((\\d+), ?(\\d+), ?(\\d+)/);return {r: parseInt(colourComponents[1]),g: parseInt(colourComponents[2]),b: parseInt(colourComponents[3])};}function convertRGBAtoRGB(r, g, b, alpha) {var defaultBackground = 255;return {r: (1 - alpha) * defaultBackground + alpha * r,g: (1 - alpha) * defaultBackground + alpha * g,b: (1 - alpha) * defaultBackground + alpha * b};}function getColourContrast(rgb1, rgb2) {var luminance1 = getColourLuminance(rgb1.r, rgb1.g, rgb1.b);var luminance2 = getColourLuminance(rgb2.r, rgb2.g, rgb2.b);return luminance1 / luminance2;}function getColourLuminance(r, g, b) {var a = [r, g, b].map(function (v) {v /= 255;return v <= .03928? v / 12.92: Math.pow((v + .055) / 1.055, 2.4);});return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * .0722 + .05;}function doesTextContrast(fontSize, fontWeight, contrast) {var minContrastLevel = 7;var largeTextContrastLevel = 4.5;var largeTextSize = 24;var largeTextSizeBold = 18.66;var boldTextWeight = 700;var passedMinContrast = contrast >= minContrastLevel;var isLargeText = (fontSize >= largeTextSize) || (fontWeight >= boldTextWeight && fontSize >= largeTextSizeBold);var passedLargeTextMinContrast = (isLargeText && contrast >= largeTextContrastLevel);return passedMinContrast || passedLargeTextMinContrast;}', 'Find text that does not contrast well enough with the background');
	private _textSpacingSnippet: CodeSnippet = new CodeSnippet('(() => {let body = document.body || document.getElementsByTagName("body")[0];let textSpacing = document.createElement("style");body.appendChild(textSpacing);textSpacing.type = "text/css";textSpacing.appendChild(document.createTextNode("* {line-height: 2.5 !important;letter-spacing:1.12 !important;word-spacing:1.16 !important;}p {margin-bottom: 2em !important;}"))})();', 'Increase the spacing of text to test for broken layouts');
	private _missingTitleSnippet: CodeSnippet = new CodeSnippet('(() => {if(document.title.length===0){console.error("missing title")}})()', 'Detect missing page title');
	private _largeTabindexSnippet: CodeSnippet = new CodeSnippet('(() => {let tabItems = document.querySelectorAll("*[tabindex]");tabItems.forEach((tabElement) => {let index = parseFloat(tabElement.getAttribute("tabindex"));if(index > 1){console.warn(tabElement)}})})()', 'Detect and warn about elements containing a <code>tabindex</code> higher than 1');
	private _showLinkTextSnippet: CodeSnippet = new CodeSnippet('(()=>{let links=document.querySelectorAll("a");links.forEach((domLink) => {let link = domLink.cloneNode(true);let tabIndex = link.getAttribute("tabindex");if(tabIndex === "-1")return;let images=link.querySelectorAll("img");images.forEach((image) => {let altText = image.getAttribute("alt");image.parentNode.replaceChild(document.createTextNode(altText), image);})console.log(link.innerText);})})()','Show the text of links');
					
	availableGuidelines: Guideline[] = [
		new Guideline(
			GuidelineLevel.A,
			'1.1.1',
			'Text Alternatives',
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
				new CodeSnippet('console.error(document.querySelectorAll("img:not([alt])"))', 'Find <code>&lt;img></code> tags without <code>alt</code> text'),
				this._videoCaptionSnippet,
				this._audioCaptionSnippet,
				this._unlabelledFormElementsSnippet,
			]
		),
		new Guideline(
			GuidelineLevel.A,
			'1.2.1',
			'Audio-only and Video-only (Prerecorded)',
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
			`<p>Videos and animations that should have audio descriptions (or a text equivalent).</p>
			<p>For example, an animated graph tracking a change over time should have a corresponding audio clip or time-based descriptions to 
				illustrate the same point. Avoid media types that do not offer ways to synchronise descriptions easily, such as animated 
				<abbr title="Graphics Interchange Format">GIF</abbr>s</p>
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
			`<p>Videos and animations that should have audio descriptions (or a text equivalent).</p>
			<p>For example, an animated graph tracking a change over time should have a corresponding audio clip or time-based descriptions to 
				illustrate the same point. Avoid media types that do not offer ways to synchronise descriptions easily, such as animated 
				<abbr title="Graphics Interchange Format">GIF</abbr>s</p>
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
			`<p>Videos and audio clips should have provided sign language interpretation.</p>`,
			[ContentType.Audio, ContentType.Video],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'1.2.7',
			'Extended Audio Description (Prerecorded)',
			`<p>Provide extended audio descriptions where standard audio descriptions are insufficient. Videos that do not allow enough time for 
				audio descriptions to accurately convey the video content should automatically pause to allow the video to remain synchronised 
				with the audio descriptions</p>`,
			[ContentType.Audio, ContentType.Video],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'1.2.8',
			'Media Alternative (Prerecorded)',
			`<p>Videos and animations that should have audio descriptions (or a text equivalent).</p>
			<p>For example, an animated graph tracking a change over time should have a corresponding audio clip or time-based descriptions to 
				illustrate the same point. Avoid media types that do not offer ways to synchronise descriptions easily, such as animated 
				<abbr title="Graphics Interchange Format">GIF</abbr>s</p>
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
			`<p>Ensure that the same meaning of your content is conveyed when a user perceives the content in a different form. Sighted users 
				get a lot of context from the appearance of elements, but people who have problems with their site benefit from additional 
				semantics and cues. You should ensure that you:</p>
			<ul>
				<li>Use semantic markup and don't rely on styling <code>&lt;div></code> and <code>&lt;span></code> elements</li>
				<li>Where the right markup cannot be used, add the correct <code>role</code> attribute to help identify what it's meant to be</li>
				<li>Don't rely on colour alone to identify meaning. Red might indicate an error, but to someone who cannot see red, put the word 
					'error' (or similar) into the message to convey the same meaning</li>
				<li>Identify required fields with the <code>required</code> attribute, and not only with a symbol, and for sighted users that symbols
					 meaning should be made clear and appear before the first usage</li>
				<li>All form elements should have labels. Checkboxes and radio buttons should have individual labels and should be grouped with a 
					<code>&lt;fieldset></code></li>
				<li>Identify important landmarks by giving them accessible lables using <code>aria-labelledby</code> or <code>aria-label</code></li>
				<li>Avoid things like icon fonts as these just hide the real letter being used which a screen reader will read out, instead look 
					to using other image forms. If you must use them, mark them up with <code>role="image"</code> or hide them from assistive tech</li>
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
			`<p>The order of the content should make sense, and you should avoid using techniques of re-ordering content that is not understood by
				 assistive tech. If you have a need to change the visual order of content to something different than it appears in the 
				 <abbr title="Document Object Model">DOM</abbr>, try to avoid doing it in a way that assistive tech cannot understand. You should check that:</p>
			<ul>
				<li>Avoid deliberate bad ordering of content in the <abbr>DOM</abbr> just to use <code>float</code> to position it correctly visually</li>
				<li>Avoid using <abbr>flexbox</abbr> to change content order, as <a href="https://www.w3.org/TR/css-flexbox-1/#order-accessibility">screen 
					readers (should) deliberately ignore this</a></li>
			</ul>
			<p>Test the content order by disabling all <abbr title="Cascading Style Sheets">CSS</abbr> and observing that the result is logical</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'1.3.3',
			'Sensory Characteristics',
			`<p>Instructions or context for content should not rely on a particular sensory characteristic, e.g. colour, shape, relative location, etc</p>
			<p>If you have instructions of contextual clues (e.g. a status indicator), you should avoid relying on sensory characteristics, as not all 
				users can percieve these.</p>
			<ul>
				<li>Avoid referencing information by colour: e.g. using traffic light style dots to indicate availability status. Not everyone can see 
					the dots or determine their colour</li>
				<li>Try not to refer to elements by their shape. For example, 'round button', or 'icon of two squares'.</li>
				<li>Don't refer to content by it's location (i.e. 'the paragraph above', or 'the menu on the left') as this both relies on a user reading 
					from start to finish and can also break in languages that don't follow a left-to-right order</li>
				<li>If you have graphs or charts where the size of an element denotes its value you should also include the values in another accessible 
					format, such as a table or list, for example</li>
			</ul>
			<p>Test the content order by disabling all <abbr title="Cascading Style Sheets">CSS</abbr> and observing that the result is logical</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AA,
			'1.3.4',
			'Orientation',
			`<p>Avoid restricting your content to a specific orientation unless the orientation is vital to the content.</p>
			<p>An exceptions might bea virtual reality display where the display requires landscape orientation of a phone</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AA,
			'1.3.5',
			'Identify Input Purpose',
			`<p>The appropriate form field types should be used for different types of input. It should be noted that sometimes inputs may look like a 
				type they're not, and in those cases an appropriate <code>inputmode</code> (or <code>pattern</code> for older devices) attribute should 
				be used instead</p>
			<ul>
				<li>Textual inputs should use the correct type:
					<ul>
						<li>color</li>
						<li>date</li>
						<li>datetime-local (this replaces datetime)</li>
						<li>email</li>
						<li>month</li>
						<li>number</li>
						<li>password</li>
						<li>search</li>
						<li>tel</li>
						<li>text (this is the default and used when a browser does not recognise the type used)</li>
						<li>time</li>
						<li>url</li>
						<li>week</li>
					</ul>
				</li>
			</ul>
			<p>There are times when something might appear to look like a specific type, but should actually be treated as text though:</p>
			<ul>
				<li>Phone numbers: these are not actuallu numbers, using a number field will strip leading zeroes in some browsers</li>
				<li>2fa auth codes: these are not actuallu numbers, using a number field will strip leading zeroes in some browsers</li>
				<li><code>&lt;input type="range"></code> is not valid for toggle buttons despite it looking like it might be</li>
			</ul>
			<p>Also autocomplete options should not be disabled on forms unless stricly necessary, as some users may struggle with typing if they 
				have poor motor skills.</p>`,
			[ContentType.Forms],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'1.3.6',
			'Identify Purpose',
			`<p>Parts of the page should be identifiable as specific regions using named landmark areas. Interactive components should use native 
				elements where possible, and identify their purpose in other ways when native elements cannot perform the task.</p>
			<p>For example, <code>&lt;form></code>, <code>&lt;nav></code>, and <code>&lt;section></code> elements should be labelled using 
				<code>arial-labelledby</code> or <code>aria-label</code>, and custom components should use the correct <code>role</code> attribute 
				to identify their purpose.</p>`,
			[ContentType.Audio, ContentType.Forms, ContentType.Images, ContentType.Modals, ContentType.Video],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'1.4.1',
			'Use of Colour',
			`<p>Colour should not be the only means of conveying information. If you use colour to convey information, e.g. using traffic light 
				colours to denote the status of something, then you should also convey this information in other ways to be accessible to people 
				who can't perceive colours.</p>
			<p>Instead of relying only on colour, consider using text or different icons to identify the different meanings of things.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'1.4.2',
			'Audio Control',
			`<p>If audio on a page plays for longer than 3 seconds, it should have controls to allow a user to pause, stop, or mute and change the volume</p>
			<p>Audio that's longer than 3 seconds shouldn't play automatically without being initiated by the user, unless that purpose is 
				clear (e.g. a music website might play a radio stream when loading a page specifically for listening to that stream)</p>`,
			[ContentType.Audio, ContentType.Video],
			[]
		),
		new Guideline(
			GuidelineLevel.AA,
			'1.4.3',
			'Contrast (Minimum)',
			`<p>Text should contrast with its background with a ratio of 4.5:1. Large text may have a 3:1 contrast ratio. Large text is either:</p>
			<ul>
				<li>18 point (1 point is <sup>1</sup>/<sub>72</sub>th of an inch, so is dependendent on screen resolution and pixel density)</li>
				<li>14 point and bold</li>
			</ul>
			<p><em>It should be noted that very light fonts or languages with very detailed characters (such as Chinese or Japanese) means that 
				text may still not contrast sufficiently for some people</em></p>
			<p>Colour contrast can be checked easily within the developer tools of Firefox, or in Chrome Lighthouse. Firefox is preferred if 
				there are dynamic components on the page that rely on specific user input, as Chrome will miss those.`,
			[],
			[
				this._colourContrastSnippet
			]
		),
		new Guideline(
			GuidelineLevel.AA,
			'1.4.4',
			'Resize Text',
			`<p>The user interface should allow for text to be increased to 200% of its original size, without the interface breaking or 
				losing functionality.</p>
			<p>The website itself does not need to offer the user the ability to adjust the text size (although it can).</p>
			<p>The website should bear in mind that a user may specify a <em>miniumum</em> font size, so any calculations performed on the 
				base font size that drops below this minimum will be capped at the minimum.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AA,
			'1.4.5',
			'Images of Text',
			`<p>Wherever possible, text should be used instead of images of text unless the visual presentation is crucial, such as with a 
				branded logo, or when portraying a font that is not available. In these cases, a text alternative should also be provided 
				for those who cannot see the image.</p>`,
			[ContentType.Images],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'1.4.6',
			'Contrast (Enhanced)',
			`<p>Text should contrast with a ratio of 7:1 with its background. Large text may contrast with a ratio of 4..5:1. Large text is classed as:</p>
			<ul>
				<li>18 point (1 point is <sup>1</sup>/<sub>72</sub>th of an inch, so is dependendent on screen resolution and pixel density)</li>
				<li>14 point and bold</li>
			</ul><p><em>It should be noted that very light fonts or languages with very detailed characters (such as Chinese or Japanese) means that text 
				may still not contrast sufficiently for some people</em></p>
			<p>Colour contrast can be checked easily within the developer tools of Firefox, or in Chrome Lighthouse. Firefox is preferred if there are 
				dynamic components on the page that rely on specific user input, as Chrome will miss those.`,
			[],
			[
				this._colourContrastHighSnippet
			]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'1.4.7',
			'Low or No Background Audio',
			`<p>Avoid background sounds on audio containing speech, as this can be distracting and make the speech impossible to discern for those 
				who have any problems with their hearing. If you do need to keep background sounds (e.g. atmospheric music to set the tone for speech) 
				then ensure that:</p>
			<ul>
				<li>Background sounds can be disabled or have their volume lowered</li>
				<li><em>or</em> the background sounds are 4&times; quieter (20 <abbr title="decibels">dB</abbr> lower) than the speech</li>
			</ul>`,
			[ContentType.Audio, ContentType.Video],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'1.4.8',
			'Visual Presentation',
			`<p>Large blocks of text should allow the user to do the following without the functionality of the website breaking:</p>
			<ul>
				<li>Change the colours for both the text and background</li>
				<li>Adjust the width to no more than 80 characters per line (or 40 if using Chinese, Japanese, or Korean characters)</li>
				<li>Remove any text justification</li>
				<li>Increase line spacing to double the font size</li>
				<li>Increase spacing between paragraphs to 3&times; the font size</li>
				<li>Resize the text to 200% of it's original size</li>
			</ul>
			<p>If the user does make any of these changes, the interface should not cause horizontal scrolling, and functionality should not be 
				lost or broken on a full-screen window on the device being used.</p>
			<p>It is not required that you include functionality within your front-end to effect these changes, as they can be performed by the 
				user through their browser or operating system interface, but your website should be ready to handle such changes made.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'1.4.9',
			'Images of Text (No Exception)',
			`<p>Images of text should not be used except where it's absolutely essential, such as with a brand logo or an example of a real world object.</p>`,
			[ContentType.Images],
			[]
		),
		new Guideline(
			GuidelineLevel.AA,
			'1.4.10',
			'Reflow',
			`<p>Content should not require scrolling in 2 dimensions when viewed on different screen sizes or when zoom is increased by a user.</p>
			<p>Exceptions can be made for content which specifically relies on a specific layout. For example, and image cannot reflow in a small
				space when zoom is increased without breaking it. If possible, allow these elements to be panned as individual elements and not
				affect the surrounding content, e.g. by putting a large table inside a <code>&lt;div></code> with overflow, but limit that container
				to 100% of the available width.</p>
			<p>See this <a href="https://www.w3.org/WAI/WCAG21/Understanding/reflow.html#example-1-responsive-design">responsive design example of
				the <abbr title="British Broadcasting Company">BBC</abbr></a>.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AA,
			'1.4.11',
			'Non-text Contrast',
			`<p>Non textual elements should contrast with a ratio of at least 3:1 with their adjacent siblings. This includes things like interactive
				components (form controls, etc), and graphical items like graphs and charts.</p>
			<p>For example, the bars on a bar graph should contrast with their neighbouring bars. Attention should also be made concerning the size
				of the elements, as smaller items may need a higher colour contrast in order to be distinguishable in the same way that smaller, lighter
				fonts require greater contrast against their backgrounds.</p>`,
			[ContentType.Images, ContentType.Forms, ContentType.Modals, ContentType.Video],
			[]
		),
		new Guideline(
			GuidelineLevel.AA,
			'1.4.12',
			'Text Spacing',
			`<p>Channging all of the following properties (e.g. via a browser setting from the user) and no others should not cause the website to
				break and there should be no loss of functionality:</p>
			<ul>
				<li>Increase <code>line-height</code> for all text to 1.5&times; the font size</li>
				<li>Paragraph spacing (<code>margin-bottom</code>) incresed to at least 2&times; the font size</li>
				<li>Increase <code>letter-spacing</code> to at least 0.12&times; the font size</li>
				<li>Increase <code>word-spacing</code> to at least 0.16&times; the font size</li>
			</ul>`,
			[],
			[
				this._textSpacingSnippet
			]
		),
		new Guideline(
			GuidelineLevel.AA,
			'1.4.13',
			'Content on Hover or Focus',
			`<p>If content is shown/hidden based on other elements on the page receiving hover or focus (e.g. a tooltip or password field rule hint),
				the new content should:</p>
			<ul>
				<li>Be dismissable without changing focus/hover unless the new content is an error and does not hide other content on the page</li>
				<li>If triggered by hover, the pointer can be moved over the new content without it disappearing (e.g. a drop-down menu)</li>
				<li>The content remains until the focus/hover is removed or is dimissed or is no longer valid (e.g. an error was corrected)</li>
			</ul>`,
			[ContentType.Animation, ContentType.Forms, ContentType.Modals, ContentType.Timed],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'2.1.1',
			'Keyboard',
			`<p>All functionality of the website should be accessible with keyboard alone, except where a keyboard cannot reasonably be used,
				such as a freehand pencil tool in a drawing application.</p>
			<p>You should test your content <em>without</em> the use of a screen reader, as some screen readers will automatically treat some 
				keyboard actions as their mouse equivalent. For example, an interactive component that has only registered a click event handler.
				Under normal keyboard-only situations, this would not capture keyboard events, like the Enter key being pressed. Whilst running
				a screen reader, the Enter key <em>would</em> fire the click event.</p>
			<p>You should verify that all links and form elements can be tabbed into and used. For custom elements you should ensure that the
				functionality is available. If this is not possible, the same functionality should be offered in an alternate accessible manner.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'2.1.2',
			'Keyboard Trap',
			`<p>If the user can move focus to an element using the keyboard, then it should be possible to move it away using the keyboard. If the 
				user is not able to exit using the same method they entered, an alternative should be supplied, and the user should be informed
				about this method.</p>
			<p>For example, a text editor control might allow itself to be tabbed into, but then might capture tabs and output them as the tab
				character inside the editor interface. It could then offer an alternative key combination in order to exit the control, such as 
				<code>CTRL</code> and <code>Tab</code>.</p>
			<p>An exception where keyboard trapping is logical would be a modal displayed asking the user to confirm a destructive action (such as
				a delete). The modal blocks clicking outside onto other elements. Trapping focus within the focusable elements of the modal ensures
				a consistent user experience. In this case, the modal should accept the Escape key as equivalent to the cancel action of the modal.
				For completeness, whichever option the user chose that closes the modal, the focus should be returned to whatever triggered it, so 
				that their journey follows on from the point they expect.</p>`,
			[ContentType.Forms, ContentType.Modals],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'2.1.3',
			'Keyboard',
			`<p>All functionality of the website should be accessible with keyboard alone.</p>
			<p>If your content has functionality which absolutely needs non-keyboard input, then it cannot pass this guideline.</p>
			<p>You should test your content <em>without</em> the use of a screen reader, as some screen readers will automatically treat some 
				keyboard actions as their mouse equivalent. For example, an interactive component that has only registered a click event handler.
				Under normal keyboard-only situations, this would not capture keyboard events, like the Enter key being pressed. Whilst running
				a screen reader, the Enter key <em>would</em> fire the click event.</p>
			<p>You should verify that all links and form elements can be tabbed into and used. For custom elements you should ensure that the
				functionality is available.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'2.1.4',
			'Character Key Shortcuts',
			`<p>If you offer keyboard shortcuts to allow users to more quickly access functionality (e.g. a rich text editor that has key shortcuts
				to highligh text in bold or italic), then you must ensure that the shortcuts can be remapped, disabled, or are only active when
				the functional component they're part of has focus.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'2.2.1',
			'Timing Adjustable',
			`<p>Functionality which relies on a specific time limit (e.g. shopping cart item hold, login session duration, popup notification)
				you should ensure that at least one of the following is true:</p>
			<ul>
				<li>The time limit can be disabled</li>
				<li>The time limit can be increased at least 10&times; the default length</li>
				<li>The user is given at least a 20 second notice before the time expires and is given opportunity to extend it at least 10&times;
					the default. This must be offered by a simple action.</li>
			</ul>
			<p>Exceptions to disabling or extending the limit can be made under at least one of the folling conditions:</p>
			<ul>
				<li>The limit is tied to a real-time event, such as a bid on an auction where it would be unfair for a user to be given an
					extended amount of time</li>
				<li>The limit is essential and would invalidate the function or activity (e.g. a two-factor authentication code which relies
					on a 30-second window for its security</li>
				<li>The time limit is longer than 20 hours, such as for a login session which lasts a day</li>
			</ul>`,
			[ContentType.Timed],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'2.2.2',
			'Pause, Stop, Hide',
			`<p>Any animation that starts automatically and lasts more than 5 seconds should allow the user to pause, stop, or hide it, unless
				the animation is absolutely essential to the content</p>
			<p>For example, a loading animation can honor the <abbr title="Cascading StyleSheets">CSS</abbr> <code>prefer@media (prefers-reduced-motion) {}</code>
				media query to display non-animated text instead.</p>`,
			[ContentType.Animation],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'2.2.3',
			'No Timing',
			`<p>Timing should not be a part of the website in any way, unless the limit comes from a real-time event, such as an auction.</p>`,
			[ContentType.Timed],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'2.2.4',
			'Interruptions',
			`<p>Interruptions (such as popup reminders to sign up to newsletters) can be postponed or surpressed unless they are vitally important.</p>
			<p>For example, a popup which prompts the user about new messages in a chat application should have a method by which a person can pause 
				them and prevent their future appearance until the end of the current session. However, a popup warning they are disconnected or
				informing them of an important error would be allowed as an exception.</p>`,
			[ContentType.Timed],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'2.2.5',
			'Re-authenticating',
			`<p>If your website relies on timed sessions (e.g. a login session), then the user should be able to continue where they left off after
				re-authenticating. For example, a lengthy signup form could store the user input in their browser as they go (paying mind to any
				security concerns regarding sensitive information like credit card info, etc) and retrieve it later if their session expires
				during the process.</p>`,
			[ContentType.Timed],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'2.2.6',
			'Timeouts',
			`<p>Users should be warned about any loss of data (e.g. details entered into a signup form) that may occur if a given time limit is
				reached (such as a session timeout), unless the data is preserved in some way. Restrictions on the types of data and the country 
				of origin of the user may affect any data retention in such cases.</p>`,
			[ContentType.Timed],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'2.3.1',
			'Three Flashes or Below Threshold',
			`<p>There should be no content that flashes more than 3 times in a second, unless the the flashing is below the
				 <a href="https://www.w3.org/TR/WCAG21/#dfn-general-flash-and-red-flash-thresholds">general flash and red flash thresholds</a>.</p>`,
			[ContentType.Animation, ContentType.Video, ContentType.Timed],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'2.3.2',
			'Three Flashes',
			`<p>There should be no content that flashes more than 3 times in a second.</p>`,
			[ContentType.Animation, ContentType.Video, ContentType.Timed],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'2.3.3',
			'Animation from Interactions',
			`<p>Animations that are triggered from a user action (e.g. hovering over a link) should allow the user to disable them unless they're
				vital to the functionality of the website.</p>
			<p>For example, a tooltip animation can honor the <abbr title="Cascading StyleSheets">CSS</abbr> <code>prefer@media (prefers-reduced-motion) {}</code>
				media query to display non-animated tooltip instead.</p>`,
			[ContentType.Animation],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'2.4.1',
			'Bypass Blocks',
			`<p>Users should be offered a method that allows them to easily skip repeated content across pages.</p>
			<p>For example, a typical website will share the same heading and navigation blocks across pages. Adding a 'skip to content' link would meet this
				requirement.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'2.4.2',
			'Page Titles',
			`<p>Pages should have a title, and that title should accurately describes the pages purpose. For example, a portfolio website where all page 
				titles are just the name of the person or business it belongs to would be a fail, as the titles do not help the user identify what content
				is on each page.</p>`,
			[],
			[
				this._missingTitleSnippet
			]
		),
		new Guideline(
			GuidelineLevel.A,
			'2.4.3',
			'Focus Order',
			`<p>Content which can be navigated via keyboard should allow content to be focused in an order that makes sense. Avoid techniques which alter
				content order visually but where the underlying content order in the <abbr title="Document Object Model">DOM</abbr> is out of order purely
				to allow visual presentation to be controlled more easily.</p>
			<p>Avoid using <code>z-index</code> values above 1 as this is a sign that the content is possibly not in an order that makese sense.</p>`,
			[],
			[
				this._largeTabindexSnippet
			]
		),
		new Guideline(
			GuidelineLevel.A,
			'2.4.4',
			'Link Purpose (In Context)',
			`<p>Links should make sense when taken stand-alone, out of context of their surroundings. For example, a blog with a series of small excerpts
				might have links to read more. If every link just said "read more" and had no extra context, a person relying on a screen reader would
				not be able to make much sense about where each link was going. Instead, if each link were "read more about <em>blog post title</em>"
				the user would be able to easily understand where each link was going to take them.</p>
			<p>If the link contains images, ensure that the <code>alt</code> text of the images also makes sense.</p>`,
			[],
			[
				this._showLinkTextSnippet
			]
		),
		new Guideline(
			GuidelineLevel.AA,
			'2.4.5',
			'Multiple Ways',
			`<p>A person should be able to use more than one single way locate a web page within a set of pages. For example, a blog containing many
				posts could offer links to various posts by a tagging system, or a search feature.</p>
			<p>An exception to this can be made for pages that are transactional in nature, such as those used in a signup process. A user shouldn't be
				able to access step 2 if they've not already completed step one, for example.</p>
			<p>Having your pages available to search engines and indexable does meet this requirement.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AA,
			'2.4.6',
			'Headings and Labels',
			`<p>Headings for pages and sections should describe the content they head up. Avoid overly "quirky" headings that do not relate to or
				 describe the content for their corresponding section.</p>
			<p>Labels for form fields (including button text) should describe the field they accompany. Avoid generic terms like "click here" 
				for buttons, and try not to re-use field labels.</p>`,
			[],
			[]
		),
	];
}
