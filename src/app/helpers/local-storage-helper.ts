import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageHelper {
	private _window;

	constructor() {
		this._window = window;
	}

	public setItem(key: string, data: string): boolean {
		try {
			if(this.hasItem(key)) {
				this._window.localStorage.removeItem(key);
			}

			this._window.localStorage.setItem(key, data);
			return true;
		} catch(e) {
			return false;
		}
	}

	public getItem(key: string): string {
		try {
			return this._window.localStorage.getItem(key);
		} catch(e) {}
	}

	public hasItem(key: string): boolean {
		try {
			let data = this.getItem(key);
			return data.length > 0;
		} catch(e) {
			return false;
		}
	}
}
