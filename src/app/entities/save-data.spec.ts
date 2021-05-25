import { SaveData } from './save-data';

describe('SaveData', () => {
	let contentLevels = [];
	let complianceLevel = 2;
	let checkedGuidelines = [];

	it('should create an instance', () => {
		expect(new SaveData(contentLevels, complianceLevel, checkedGuidelines)).toBeTruthy();
	});
});
