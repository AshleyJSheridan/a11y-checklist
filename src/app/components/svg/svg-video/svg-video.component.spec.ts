import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SvgVideoComponent } from './svg-video.component';

describe('SvgVideoComponent', () => {
	let component: SvgVideoComponent;
	let fixture: ComponentFixture<SvgVideoComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ SvgVideoComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SvgVideoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
