import { LocalStorageHelper } from './local-storage-helper';

describe('LocalStorageHelper', () => {
	let storageHelper: LocalStorageHelper;

	beforeEach(() => {
		storageHelper = new LocalStorageHelper();
	});

	it('should create an instance', () => {
		expect(storageHelper).toBeTruthy();
	});

	it('should insert an item into local storage', () => {
		spyOn(storageHelper, 'hasItem').and.returnValue(false);

		expect(storageHelper.setItem('some key', 'some value')).toBeTruthy();
		expect(window.localStorage.getItem('some key')).toEqual('some value');
	});

	it('should retrieve an item from local storage', () => {
		window.localStorage.setItem('some key', 'some value');

		expect(storageHelper.getItem('some key')).toEqual('some value');
	});

	it('should return false if an item does not exist in local storage', () => {
		expect(storageHelper.hasItem('some key 2')).toBeFalsy();
	});

	it('should return true if an item does exist in local storage', () => {
		window.localStorage.setItem('some key', 'some value');

		expect(storageHelper.hasItem('some key')).toBeTruthy();
	});
});
