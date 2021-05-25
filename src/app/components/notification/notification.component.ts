import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {
	private notificationDisplaySeconds: number = 5;
	private _window;
	public notificationType: string;
	public message: string;
	public canShowNotification: boolean = false;

	constructor() {
		this._window = window;
	}

	ngOnInit(): void {
	}

	showNotification(notificationType: string, message: string): void {
		this.notificationType = notificationType;
		this.message = message;

		this.canShowNotification = true;

		let notificationComponent = this;
		let notificationTimeout = this._window.setTimeout(function() {
			notificationComponent.canShowNotification = false;
		}, this.notificationDisplaySeconds * 1000);
	}
}
