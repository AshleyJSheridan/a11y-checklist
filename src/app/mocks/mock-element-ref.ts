import { ElementRef } from '@angular/core';

export class MockElementRef implements ElementRef {
	nativeElement = {
		querySelector: function(query: string) {},
		querySelectorAll: function(query: string) {}
	};
}