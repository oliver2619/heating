import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';
import { TranslateDirective } from './translate.directive';
import { AboutComponent } from './about/about.component';
import { SetupComponent } from './setup/setup.component';
import { MenuComponent } from './menu/menu.component';
import { HeatingComponent } from './heating/heating.component';
import { SelectSystemComponent } from './select-system/select-system.component';
import { TranslatePipe } from './translate.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageBoxComponent } from './message-box/message-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActiveElementsComponent } from './active-elements/active-elements.component';
import { PassiveElementsComponent } from './passive-elements/passive-elements.component';
import { SetupCommonComponent } from './setup-common/setup-common.component';
import { ActiveElementComponent } from './active-element/active-element.component';
import { PassiveElementComponent } from './passive-element/passive-element.component';
import { ActiveSystemsComponent } from './active-systems/active-systems.component';
import { HistoryComponent } from './history/history.component';
import { RecordingComponent } from './recording/recording.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CalculatorComponent } from './calculator/calculator.component';
import { NewSystemComponent } from './new-system/new-system.component';
import { NewActiveElementComponent } from './new-active-element/new-active-element.component';
import { NewPassiveElementComponent } from './new-passive-element/new-passive-element.component';
import { HeatingErrorHandlerService } from './heating-error-handler.service';

@NgModule({
	declarations: [
		AppComponent,
		SplashComponent,
		TranslateDirective,
		AboutComponent,
		SetupComponent,
		MenuComponent,
		HeatingComponent,
		SelectSystemComponent,
		TranslatePipe,
		MessageBoxComponent,
		ActiveElementsComponent,
		PassiveElementsComponent,
		SetupCommonComponent,
		ActiveElementComponent,
		PassiveElementComponent,
		ActiveSystemsComponent,
		HistoryComponent,
		RecordingComponent,
		CalculatorComponent,
		NewSystemComponent,
		NewActiveElementComponent,
		NewPassiveElementComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],
	providers: [{
		provide: ErrorHandler,
		useClass: HeatingErrorHandlerService
	}],
	bootstrap: [AppComponent]
})
export class AppModule { }
