import { ArrayHelper } from './array-helper';

describe('ArrayHelper', () => {
	let helper: ArrayHelper;
	
	beforeEach(() => {
		helper = new ArrayHelper();
	});
	
	it('should create an instance', () => {
		expect(helper).toBeTruthy();
	});
	
	it('should add an element to an array when called', () => {
		let baseArray1 = ['array', 'with', 'some', 'elements'];
		let baseArray2 = [1, 2, 3, 4, 5];
		let itemToAdd1 = 'some new item';
		let itemToAdd2 = 6;

		helper.addToArray(baseArray1, itemToAdd1);
		helper.addToArray(baseArray2, itemToAdd2);
		
		expect(baseArray1).toEqual(['array', 'with', 'some', 'elements', 'some new item']);
		expect(baseArray2).toEqual([1, 2, 3, 4, 5, 6]);
	});
	
	it('should remove the first matching element from an array', () => {
		let baseArray1 = ['array', 'with', 'some', 'elements'];
		let baseArray2 = [1, 2, 3, 4, 5];
		
		helper.removeFromArray(baseArray1, 'some');
		helper.removeFromArray(baseArray2, 3);
		
		expect(baseArray1).toEqual(['array', 'with', 'elements']);
		expect(baseArray2).toEqual([1, 2, 4, 5]);
	});
});
