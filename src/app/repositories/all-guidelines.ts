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
	private _missingTitleSnippet: CodeSnippet = new CodeSnippet('(() => {if(document.title.length===0){console.error("missing page title")}})()', 'Detect missing page title');
	private _largeTabindexSnippet: CodeSnippet = new CodeSnippet('(() => {let tabItems = document.querySelectorAll("*[tabindex]");tabItems.forEach((tabElement) => {let index = parseFloat(tabElement.getAttribute("tabindex"));if(index > 1){console.warn(tabElement)}})})()', 'Detect and warn about elements containing a <code>tabindex</code> higher than 1');
	private _showLinkTextSnippet: CodeSnippet = new CodeSnippet('(()=>{let links=document.querySelectorAll("a");links.forEach((domLink) => {let link = domLink.cloneNode(true);let tabIndex = link.getAttribute("tabindex");if(tabIndex === "-1")return;let images=link.querySelectorAll("img");images.forEach((image) => {let altText = image.getAttribute("alt");image.parentNode.replaceChild(document.createTextNode(altText), image);})console.log(link.innerText);})})()','Show the text of links');
	private _missingDocumentLanguage: CodeSnippet = new CodeSnippet('(() => {if(document.querySelector("html:not([lang])")){console.error("missing document language identifier")}})()','Detect missing document language identifier');
	private _missingLanguageOfParts: CodeSnippet = new CodeSnippet('(() => {if(document.querySelectorAll("*[lang]").length<1){}console.warn("No alternate language parts of document found")})()','Detect no lang attributes on any part of document');
					
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
			`<p>Links should make sense when taken stand-alone Adjacent text can be used to supply additional context. For example, a news article
				highlighting a recent event on horses might link to an external source for survey data with a sentence like "The original data for
				this graph is from this years Prestigious University Horse Welfare Study", and the text "Prestigious University Horse Welfare Study"
				would be the link. The link can be easily understood out of context, but the surrounding sentence lends further context to it.</p>
			<p>If the link contains images, ensure that the <code>alt</code> text of the images also makes sense within the existing text of the link.</p>`,
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
		new Guideline(
			GuidelineLevel.AA,
			'2.4.7',
			'Focus Visible',
			`<p>Any element that can receive focus from keyboard interaction should have a visible indicator to show this. A browser typically does
				this by giving elements a border or box shadow, and these styles can be overridden with your websites' 
				<abbr title="Cascading Style Sheets">CSS</abbr>.</p>
			<p>Avoid removing default browser focus styles without replacing them with an alternative that:</p>
			<ul>
				<li>Doesn't rely on colour alone; not everyone can perceive all colours</li>
				<li>Doesn't rely on font styles alone; some styles might not be available in a given font, fonts can be overridden by the user, and
					sometimes browsers break things</li>
				<li>Doesn't rely on shadows alone; some dark/high contrast modes remove all shadows</li>
			</ul>
			<p>A common pattern to resolve Windows High Contrast mode removing shadows is to give elements a transparent border with a defined width.
				When the shadow is removed, the border colour is set to the foreground automaticall by the operating system.</p>
			<p>To test this effectively, tab through all the content on your page and ensure that you can visibly see where the focus is at all times.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'2.4.8',
			'Location',
			`<p>Users should be able to identify where they are within your website. This can be achieved by highlighting the main section they're in
				within the websites navigation menu, or by using a breadcrumb component. This helps people with memory problems. It can also help
				those users who	may have needed to go away for a short period of time and need a reminder about what they were doing before.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'2.4.9',
			'Link Purpose (Link Only)',
			`<p>Links should make sense when taken stand-alone, out of context of their surroundings. For example, a blog with a series of small excerpts
				might have links to read more. If every link just said "read more" and had no extra context, a person relying on a screen reader would
				not be able to make much sense about where each link was going. Instead, if each link were "read more about <em>blog post title</em>"
				the user would be able to easily understand where each link was going to take them.</p>
			<p>If the link contains images, ensure that the <code>alt</code> text of the images also makes sense within the existing text of the link.</p>
			<p>If a link needs to visually remain as "read more", then <code>aria-labelledby</code> or <code>aria-label</code> can be used to provied an
				accessible label, but this approach should be considered a last resort</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'2.4.10',
			'Section Headings',
			`<p>Pages are often broken up into sections, and each should be headed with an appropriate level of heading. A good way to do achieve this is
				to give an <code>id</code> to the visible heading, and associate the sectioning element with <code>aria-describedby</code>, which makes
				the section a named landmark, enabling screen reader users to more easily navigate the page.</p>
			<p>You should add sectioning elements (e.g. <code>&lt;section></code>, <code>&lt;aside></code>, <code>&lt;form></code>, etc) at appropriate
				points of the page, which might often match the visual layout of the page.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'2.5.1',
			'Pointer Gestures',
			`<p>Any functionality which relies on gestures (e.g. like unlocking a phone with a drawn pattern) or multiple points of interaction at once (e.g. 
				pinch and zoom on a map) should also be available with a single pointer and without gestures, unless this is absolutely essential.</p>
			<p>So, a map that relies on two points of interaction for zooming could also have buttons to provide this same behaviour for those people who
				cannot do this. A phone lock screen that relies on drawing a specific pattern cannot offer an alternative method for inputting the pattern,
				but it can offer an alternative method of unlocking the device (such as fingerprint, password, or facial recognition).</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'2.5.2',
			'Pointer Cancellation',
			`<p>Functionality that is pointer based should allow actions to be cancelled or reversed. For example, a file manager allows a file to be
				dragged across to a different folder to move it, but you could cancel this action by moving to an inactive area of the file manager
				before releasing the mouse button, and you can undo the move action if it was done by mistake.</p>
			<p>In order to best achieve this, you should ensure that:</p>
			<ul>
				<li>Actions are not triggered by the down event, this should only be used to start an action, never complete one</li>
				<li>Any action can be undone, such as a move, rename, or delete action</li>
				<li>Actions can be aborted by the user, e.g. by moving the pointer outside of the active area before releasing, or by moving the pointer
					off of the active button.</li>
			</ul>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'2.5.3',
			'Label in Name',
			`<p>If a component has a visible label, that label should also be accessibly connected to that component. There are some exceptions:</p>
			<ul>
				<li>A link the visually contains only the text "read more" might have a more accessible name (via <code>aria-label</code> that says 
					"read more about XYZ news story". The accessible name should contain the full visible text.</li>
				<li>If there is no visual text for a component (e.g. it's a representative icon) then it's excempt from this guideline</li>
				<li>If there is an icon that contains some symbolic characters (e.g. the bold, italic, and underline buttons of a text editor) then
					the accessible label should label the action the button is performing</li>
			</ul>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'2.5.4',
			'Motion Actuation',
			`<p>If a particular function is tied to the physical movement of a device (e.g. moving a phone around to view a panoramic 3D photo), then
				that function should also be available via other methods (such as pointer movement over the image)</p>
			<p>Exceptions to this might be:</p>
			<ul>
				<li>A pedometer application in a phone or smart watch</li>
				<li>A spirit level which relies on the orientation of a device for accuracy of readings</li>
			</ul>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'2.5.5',
			'Target Size',
			`<p>The size of interactive elements should be at least 44&times;44 pixels in order to allow users without fine motor control to
				use them. Exceptions can be made when:</p>
			<ul>
				<li>The target is inline in a block of text, e.g. a link around a word. However, where links are used in text, the text should
					not be too small and the link should wrap around enough words to make sense when taken out of context.</li>
				<li>If the interactive element in question is visually determined by the browser (e.g. a file upload button)</li>
				<li>There is an equivalent alternative available of an accessible size</li>
			</ul>
			<p>Note that links or buttons which contain letter-like symbols should meet this guideline, such as a help link which is just the
				"?" symbol.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'2.5.6',
			'Concurrent Input Mechanisms',
			`<p>A website or web app should not limit the user to a specific type of input unless absolutely necessary. You can't rely on a
				devices primary input mechanism as being the only one in use. For example, Android phones and tablets allow for a mouse to
				be plugged in, allowing them to completely bypass the touchscreen. Someone might do this if they struggle with the fine 
				motor control to operate a touchscreen, but have enough to operate a mouse, for example. Another person who was unable to
				use a regular keyboard might rely on an on-screen version instead to type.</p>
			<p>An exception to this might be a fingerprint scanner, which would obviously require touch. Generally, avoid specific
				event handlers (keydown, keyup, etc) in favour of more input-agnostic ones (focus, click, etc).</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'3.1.1',
			'Language of Page',
			`<p>Regardlless of whether or not a page exists in multiple languages it should indicate to the browser what language the 
				content is in. This can be done with the <code>lang</code> attribute on the <code>&lt;html></code> tag. It should be
				noted that <a href="https://www.w3.org/WAI/WCAG21/Techniques/server-side-script/SVR5.html#description">setting the 
				locale with the <code>Content-Language</code> header does not meet this guideline</a>.</p>`,
			[],
			[this._missingDocumentLanguage]
		),
		new Guideline(
			GuidelineLevel.AA,
			'3.1.2',
			'Language of Parts',
			`<p>If a website contains content in multiple languages, those parts should be identified with a <code>lang</code> attribute
				on the containing block.</p>`,
			[ContentType.Translations],
			[this._missingLanguageOfParts]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'3.1.3',
			'Unusual Words',
			`<p>Some people may find it difficult to understand unusual or specialised words or phrases. This can be more pronounced in 
				websites covering a specialist or niche subject matter. Users with cognitive or learning disabilities and younger audiences
				can find this kind of language use especially difficult to read and understand.</p>
			<p>In order to make the experience as comfortable as possible for your users, try to:</p>
			<ul>
				<li>Avoid unnecessary jargon</li>
				<li>Explain unusual terms, and include a glossary if there are many such terms used</li>
				<li>Avoid idioms, these don't translate well to all other languages if content is multi-lingual</li>
			</ul>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'3.1.4',
			'Abbreviations',
			`<p>Some users may find abbreviations hard to understand, and this can be even more of an issue if they are also using a
				screen reader as this may read out abbreviations with the wrong pronunciation.</p>
			<p>Further confusion can be created if the same abbreviation has different meanings, for example the letters "st" can be
				interpretted as both "stree" and "station".</p>
			<p>In order to make abbreviations as accessible as possible, you should:</p>
			<ul>
				<li>Mark up abbreviations with the correct <code>&lt;abbr></code> tag</li>
				<li>Include the definition and abbreviation in parentheses for its first use, e.g. "Web Accessibility Initiative (WAI)"</li>
				<li>Link to a glossary containing the abbreviations used</li>
				<li>Avoid abbreviations that could be confusing, e.g. "accessibility" is sometimes abbreviated to "a11y", but this can be
					confusing for people who do not know it, as it has little in relation to the original word. Use of this abbreviation
					is typically reserved for use in cases where small text limits apply, like Twitter or mobile phone text messages.</li>
			</ul>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'3.1.5',
			'Reading Level',
			`<p>People will only be able to easily understand content up to their reading level or age. So, for example, someone who can
				only read up to the level of a 10 year old will find content that has a higher reading age more difficult to understand.
				Content should be readable by someone with a lower secondary education level, or about that of an 11 year old. If your 
				content is more complicated than this, then you should provide an equivalent version that meets this requirement.</p>
			<p>You can determine the reading level of your content with a Flesch-Kinkaid test (or equivalent for non-English content).</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'3.1.6',
			'Pronunciation',
			`<p>The meaning of content may sometimes rely upon the pronounciation of words. Usually, this can be derived from the context
				of those words within a sentence, but if they're missing that, then additional context may be required.</p>
			<p>For example, the word "read" in English changes meaning depending on whether it's past or present tense, so using it as a
				standalone word might be confusing. Consider a message system where each message has a button with a label of "read".
				This could be interpreted to mean both "read this message" as an action and "mark the message as read". In order to avoid
				ambiguity, you could change the label to use an alternate phrasing, such as "mark as read", for example.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'3.2.1',
			'On Focus',
			`<p>When anything on the website recieves focus, it should not cause a change of context so that their user journey remains
				consistent and within reasonable expectations. So, for example, avoid things like:</p>
			<ul>
				<li>Submitting a form when something receieves focus. Instead, allow them to submit via a button or the Enter key</li>
				<li>Moving focus to another component, although sometimes exceptions may be made for important modal dialogues where focus
					trap might be required</li>
				<li>Opening windows, or triggering system dialogs (like print or download) unless the user has already taken a
					specific action where such a dialog might be expected (such as clicking a download link)</li>
			</ul>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'3.2.2',
			'On Input',
			`<p>When anything on the website recieves input, it should not cause a change of context so that their user journey remains
				consistent and within reasonable expectations. So, for example, avoid things like:</p>
			<ul>
				<li>Opening windows, or triggering system dialogs (like print or download) when the user presses a certain key on their
					keyboard unless it's reasonable expected. E.g. don't trigger the download dialog for a file just by pressing the
					letter "d", but you may trigger it using an <code>accesskey</code> in the HTML (which is typically <code>Alt</code>
					and <code><em>accessKey</em></code>, although it may vary slightly across browsers and operating systems)</li>
				<li>Triggering a form submission from changing the value on one of the form elements, e.g. a <code>&lt;select></code>
					list</li>
			</ul>
			<p>Instead, actions should be triggered by elements that are expected to trigger actions, such as buttons and links.</p>`,
			[ContentType.Forms],
			[]
		),
		new Guideline(
			GuidelineLevel.AA,
			'3.2.3',
			'Consistent Navigation',
			`<p>Navigation on all pages within a set (e.g. a whole website, or main sub-section of a website if it may be large
				enough to warrent this) should remain consistent. For example, the main site navigation and breadcrumbs should remain
				in the same location across pages. This will ensure that all people visitng your website will be able to navigate 
				easily.</p>
			<p>If a website is split into multiple distinct categories, such as a backup file management interface and a help section,
				the navigation might change from a very simple top-level navigation for the main parts of backup, to a longer list
				outlining the document structure for the help section.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AA,
			'3.2.4',
			'Consistent Identification',
			`<p>If your website contains repeated fuinctional components across a set of pages (e.g. search input, language picker, 
				etc) the element should be labelled and identified in the same way. This makes it easier for people who might have 
				short-term memory issues or people relying on screen readers who may not have the same visual identifiers to go by.</p>
			<p>Exceptions can be made if the element offers functionality that differs in some way, and that difference can
				be reflected in the labelling for the element.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'3.2.5',
			'Change on Request',
			`<p>Changes of your current browsing context should be initiated from user action. For example, launching new windows or
				file downloads should only be triggered by an action that would be expected to do that, such as clicking a link or a
				button. Initiating an action like this by hovering over something on a page, or just be visiting the page would be
				considered a violation of this.</p>
			<p>This can really help those people who might struggle with an unexpected change of context, or those relying on
				assistive technology (like a screen reader), as they could be left in a situation that doesn't match their expectations.
				For example, finding that their browser back button does not take them to where they expect, or that their screen
				reader is now on a modal dialogue that they did not request.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'3.3.1',
			'Error Identification',
			`<p>Any web components that are in an error state should identify this error state correctly and an appropriate error
				message should be presented to the user. For example, an account creation form that with a new password in an error
				state should:</p>
			<ul>
				<li>Identify the form field as being in an error state with <code>aria-invalid</code></li>
				<li>Visually highlight the password field as being in an error state. You may use an icon to indicate this, but do not
					rely on colour alone to indicate an error</li>
				<li>Label the error clearly in text, using words that can be easily understood to mean the password field has an error</li>
				<li>Associate the error message with the field when it's in an error state using <code>aria-describedby</code> so that
					people relying on screen readers can also understand <em>what</em> the error is</li>
			</ul>
			<p>You may also present the error as a form of alert instead of inline, and use <code>role="alert"</code> or
				<code>role="alertdialog"</code> to present the error, although care should be taken with this approach for larger forms
				that contain many errors, as alerts can be quite intrusive to the normal browsing process (imagine presenting all errors
				to a user with a Javscript <code>alert()</code>.)</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.A,
			'3.3.2',
			'Labels or Instructions',
			`<p>If user input requires that someone needs to enter data in a specific way, this should be indicated clearly to them
				prior to them entering that data, and not as part of an error message if they get it wrong the first time. For example:</p>
			<ul>
				<li>A date field should indicate the format required if it will only work with a specific type</li>
				<li>Phone number fields should show the format they expect, and also if non-numerical values are allowed (as phone numbers
					aren't numbers)</li>
				<li>Optional and required fields should indicate their status with more than an asterisk/star alone, such as with a message
					within the form that indicates what the use of this symbol means</li>
			</ul>
			<p>As well as this, to best aid those users relying on technology like screen readers, you should:</p>
			<ul>
				<li>Make use of <code>aria-describedby</code> to provide further messaging for more complex interface components, such as
					password complixity requirements</li>
				<li>Use grouping roles like <code>role="radiogroup"</code> or <code>&lt;fieldset></code> to group related controls, e.g.
					credit card information fields</li>
				<li>Provide examples for any input elements which require specific <code>pattern</code> values</li>
			</ul>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AA,
			'3.3.3',
			'Error Suggestion',
			`<p>If an error can be detected with user input, amd suggestions to rectify the error can be provided, they should be provided
				to the user. For example, if you were sharing a photo with a single person from a list of your contacts, you might be shown
				a free-text input field. If you type a name that doesn't exist in your contacts, the system could find the closest match
				based on your spelling.</p>
			<p>Exceptions are made for situations that might pose a security risk, such as inputs used for authorisation or authentication.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AA,
			'3.3.4',
			'Error Prevention (Legal, Financial, Data)',
			`<p>If a website allows a user to perform an action with a financial or legal transation element (such as a purchase or deletion
				of backed up data), then at least one of the following should be true:</p>
			<ol>
				<li>The submission is <strong>reversable</strong>, e.g. a deleted file can be restored</li>
				<li>The submission can be <strong>confirmed</strong>, e.g. a user is shown a confirmation message before finalising their purchase</li>
				<li>Data is <strong>checked</strong> for possible errors to allow the user the chance to correct them, such as a messaging app verifying
					the user intentionally omitted a file attachment if they mentioned attaching a file in their message</li>
			</ol>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'3.3.5',
			'Help',
			`<p>Context-sensitive should be provided to help when existing labels may not be sufficient to describe the full functionality available to
				the user. For example, an interface that allows a user to manage the appearance of their account might have an input field that allows
				them to enter code to achieve this. A link could be provided that explains in further detail what kind of code is accepted, and maybe
				small examples could be given.</p>`,
			[],
			[]
		),
		new Guideline(
			GuidelineLevel.AAA,
			'3.3.6',
			'Error Prevention (All)',
			`<p>If a website allows a user to perform an action by submitting information, then at least one of the following should be true:</p>
			<ol>
				<li>The submission is <strong>reversable</strong>, e.g. a deleted file can be restored</li>
				<li>The submission can be <strong>confirmed</strong>, e.g. a user is shown a confirmation message before finalising their purchase</li>
				<li>Data is <strong>checked</strong> for possible errors to allow the user the chance to correct them, such as a messaging app verifying
					the user intentionally omitted a file attachment if they mentioned attaching a file in their message</li>
			</ol>
			<p>This guideline extends 3.3.4 and applies it to all and any action a user might take, and not just those with a financial or legal component.</p>`,
			[],
			[]
		),
	];
}
