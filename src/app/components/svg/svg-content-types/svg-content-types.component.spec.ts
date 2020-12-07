import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SvgContentTypesComponent } from './svg-content-types.component';

describe('SvgContentTypesComponent', () => {
	let component: SvgContentTypesComponent;
	let fixture: ComponentFixture<SvgContentTypesComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ SvgContentTypesComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SvgContentTypesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
