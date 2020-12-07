import { CodeSnippet } from './code-snippet';

fdescribe('CodeSnippet', () => {
	let snippet: CodeSnippet;
	let code: string = 'some javascript code';
	let description: string = 'some code snippet description';
	
	beforeEach(() => {
		snippet = new CodeSnippet(code, description);
	});
  
	it('should create an instance', () => {
		expect(snippet).toBeTruthy();
	});
});
