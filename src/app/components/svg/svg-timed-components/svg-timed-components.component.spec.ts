import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SvgTimedComponentsComponent } from './svg-timed-components.component';

describe('SvgTimedComponentsComponent', () => {
	let component: SvgTimedComponentsComponent;
	let fixture: ComponentFixture<SvgTimedComponentsComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ SvgTimedComponentsComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SvgTimedComponentsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
