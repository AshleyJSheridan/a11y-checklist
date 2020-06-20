import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgContentTypesComponent } from './svg-content-types.component';

describe('SvgContentTypesComponent', () => {
	let component: SvgContentTypesComponent;
	let fixture: ComponentFixture<SvgContentTypesComponent>;

	beforeEach(async(() => {
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
