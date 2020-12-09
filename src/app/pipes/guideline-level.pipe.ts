import { Pipe, PipeTransform } from '@angular/core';
import { Guideline } from '../entities/guideline';

@Pipe({
	name: 'guidelineLevel'
})
export class GuidelineLevelPipe implements PipeTransform {
	transform(items: Guideline[], filter: any): any {
		return items.filter(item => item.guidelineNumber.charAt(0) === filter.level);
	}
}
