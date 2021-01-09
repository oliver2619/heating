import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { SelectSystemComponent } from './select-system/select-system.component';
import { HeatingComponent } from './heating/heating.component';
import { AboutComponent } from './about/about.component';
import { SetupComponent } from './setup/setup.component';
import { ActiveElementComponent } from './active-element/active-element.component';
import { SetupCommonComponent } from './setup-common/setup-common.component';
import { ActiveElementsComponent } from './active-elements/active-elements.component';
import { PassiveElementsComponent } from './passive-elements/passive-elements.component';
import { PassiveElementComponent } from './passive-element/passive-element.component';
import { ActiveSystemsComponent } from './active-systems/active-systems.component';
import { HistoryComponent } from './history/history.component';
import { RecordingComponent } from './recording/recording.component';
import { CalculatorComponent } from './calculator/calculator.component';

const routes: Routes = [{
	path: '',
	pathMatch: 'full',
	component: SplashComponent
}, {
	path: 'about',
	pathMatch: 'full',
	component: AboutComponent
}, {
	path: 'heating/:id',
	pathMatch: 'full',
	component: HeatingComponent
}, {
	path: 'calculator/:id',
	pathMatch: 'full',
	component: CalculatorComponent
}, {
	path: 'recording/:id/:time',
	pathMatch: 'full',
	component: RecordingComponent
}, {
	path: 'select-system',
	pathMatch: 'full',
	component: SelectSystemComponent
}, {
	path: 'active-systems',
	pathMatch: 'full',
	component: ActiveSystemsComponent
}, {
	path: 'setup/:id',
	component: SetupComponent,
	children: [{
		path: '',
		pathMatch: 'full',
		redirectTo: 'common'
	}, {
		path: 'common',
		pathMatch: 'full',
		component: SetupCommonComponent
	}, {
		path: 'active',
		pathMatch: 'full',
		component: ActiveElementsComponent
	}, {
		path: 'passive',
		pathMatch: 'full',
		component: PassiveElementsComponent
	}]
}, {
	path: 'setup/:id/active/:aid',
	pathMatch: 'full',
	component: ActiveElementComponent
}, {
	path: 'setup/:id/passive/:pid',
	pathMatch: 'full',
	component: PassiveElementComponent
}, {
	path: 'history/:id',
	pathMatch: 'full',
	component: HistoryComponent
}, {
	path: '**',
	redirectTo: '/select-system'
}];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
