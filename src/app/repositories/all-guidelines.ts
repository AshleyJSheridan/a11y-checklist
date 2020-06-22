import { Injectable } from '@angular/core';
import { Guideline } from '../entities/guideline';
import { GuidelineLevel } from '../enums/guideline-level.enum';
import { ContentType } from '../enums/content-type.enum';
import { CodeSnippet } from '../entities/code-snippet';

@Injectable({
	providedIn: 'root'
})
export class AllGuidelines {
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
				<li>Decorative/purely visual elements are hidden from assisstive tech.</li>
			</ul>`,
			[ContentType.Audio, ContentType.Images, ContentType.Video, ContentType.Forms],
			[
				new CodeSnippet('console.log(document.querySelectorAll("img:not([alt])"))', 'Find <code>&lt;img></code> tags without <code>alt</code> text'),
				new CodeSnippet('(() => {let vids = document.querySelectorAll("video");vids.forEach((vid) => {let t = vid.querySelectorAll("track[kind=subtitles], track[kind=captions], track[kind=descriptions]");if(t.length === 0){console.error(vid);}})})()', 'Find <code>&lt;video></code> elements without tracks marked as description, captions, or subtitles'),
				new CodeSnippet('(() => {let clips = document.querySelectorAll("audio");clips.forEach((clip) => {let t = clip.querySelectorAll("track[kind=subtitles], track[kind=captions], track[kind=descriptions]");if(t.length === 0){console.error(clip);}})})()', 'Find <code>&lt;audio></code> elements without tracks marked as description, captions, or subtitles'),
				new CodeSnippet('(() => {let inputs = document.querySelectorAll("input:not([type=submit]):not([type=reset]):not([type=button]):not([type=hidden]), select, textarea");inputs.forEach((input) => {let parentLabel = getParentOfType(input, "label");if(parentLabel !== false)return;let inputId = input.getAttribute("id");let associatedLabel = getElementWithAttributeValue("label", "for", inputId);if(!associatedLabel) {console.error(input);} else {let label = parentLabel ? parentLabel : associatedLabel;let labelDisplay = getComputedStyleForNode(label, "display");let labelVisibility = getComputedStyleForNode(label, "visibility");if (labelDisplay === "none" || labelVisibility === "hidden") {console.error(input);}}})})();function getParentOfType(childNode, type) {let node = childNode.parentNode;while (node !== null && node.tagName !== undefined) {if (node.tagName.toLowerCase() === type)return node;node = node.parentNode;}return false;}function getElementWithAttributeValue(elementType, attribute, attributeValue) {if (attributeValue === null)return false;var element = document.querySelector(elementType + "[" + attribute + "=" + attributeValue + "]");return element;}function getComputedStyleForNode(node, property) {var computedStyles = window.getComputedStyle(node);return computedStyles.getPropertyValue(property);}', 'Find form elements with no associated label, or labels hidden from screen readers'),
			]
		),
		new Guideline(
			GuidelineLevel.AA,
			'1.2.4',
			'Captions (Live)',
			'Captions are provided for all live audio content in synchronized media.',
			'long description',
			[ContentType.Audio, ContentType.Video],
			[]
		),
	];
}
