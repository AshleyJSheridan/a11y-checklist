import { GuidelineLevelPipe } from './guideline-level.pipe';
import { GuidelineLevel } from '../enums/guideline-level.enum';
import { Guideline } from '../entities/guideline';

describe('GuidelineLevelPipe', () => {
	const pipe = new GuidelineLevelPipe();
	let guideline1 = new Guideline(
		GuidelineLevel.A,
		'1.1.1',
		'guideline 1 name',
		'some description',
		[],
		[]
	);
	let guideline2 = new Guideline(
		GuidelineLevel.AA,
		'2.1.1',
		'guideline 2 name',
		'some description',
		[],
		[]
	);
	let guideline3 = new Guideline(
		GuidelineLevel.AA,
		'3.1.1',
		'guideline 3 name',
		'some description',
		[],
		[]
	);
	
	it('should create an instance', () => {
		expect(pipe).toBeTruthy();
	});
	
	it('should filter out guidelines matching the top level requested', () => {
		let guidelines = [guideline1, guideline2, guideline3];

		expect(pipe.transform(guidelines, {level: '1'})).toEqual([guideline1]);
		expect(pipe.transform(guidelines, {level: '2'})).toEqual([guideline2]);
		expect(pipe.transform(guidelines, {level: '3'})).toEqual([guideline3]);
	});
	
	it('should return an empty list when no guidelines matched the required level', () => {
		let guidelines = [guideline1, guideline2, guideline3];

		expect(pipe.transform(guidelines, {level: '4'})).toEqual([]);
	});
});
