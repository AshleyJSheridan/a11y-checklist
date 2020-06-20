import { Component, OnInit } from '@angular/core';
import { ChecklistService } from 'src/app/services/checklist.service';

@Component({
	selector: 'app-check',
	templateUrl: './check.component.html'
})
export class CheckComponent implements OnInit {
	private _checklistService: ChecklistService;

	constructor(checklistService: ChecklistService) { 
		this._checklistService = checklistService;
	}

	ngOnInit() {
	}


}
