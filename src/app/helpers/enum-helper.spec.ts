import { EnumHelper } from './enum-helper';
import { ContentType } from '../enums/content-type.enum';

describe('EnumHelper', () => {
	let helper: EnumHelper;
	
	beforeEach(() => {
		helper = new EnumHelper();
	});
	
	it('should create an instance', () => {
		expect(helper).toBeTruthy();
	});
	
	it('should get an array of strings matching the properties of a passed in enum', () => {
		let types = helper.getStringValuesFromEnum(ContentType);
		
		expect(types).toEqual(['Animation', 'Audio', 'Forms', 'Images', 'Modals', 'Timed', 'Translations', 'Video']);
	});
});
