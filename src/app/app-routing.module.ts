import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './components/help/help.component';
import { CheckComponent } from './components/check/check.component';

const routes: Routes = [
	{ path: '', component: CheckComponent },
	{ path: 'help', component: HelpComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
