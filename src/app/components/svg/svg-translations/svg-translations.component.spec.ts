import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SvgTranslationsComponent } from './svg-translations.component';

describe('SvgTranslationsComponent', () => {
	let component: SvgTranslationsComponent;
	let fixture: ComponentFixture<SvgTranslationsComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ SvgTranslationsComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SvgTranslationsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
