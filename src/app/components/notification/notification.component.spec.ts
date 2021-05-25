import { ComponentFixture, fakeAsync, TestBed, inject, tick } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
	let component: NotificationComponent;
	let fixture: ComponentFixture<NotificationComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ NotificationComponent ],
			providers: [ NotificationComponent ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NotificationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display a notification and dismiss it after 5 seconds',
		inject([NotificationComponent], fakeAsync((component: NotificationComponent) => {
			spyOn(window, 'setTimeout').and.callThrough();

			component.showNotification('some type', 'some message');

			expect(component.canShowNotification).toBeTruthy();
			expect(window.setTimeout).toHaveBeenCalled();

			tick(5 * 1000);

			expect(component.canShowNotification).toBeFalsy();
		}))
	);
});
