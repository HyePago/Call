import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailPage } from '../pages/detail/detail';
import { KeypadPage } from '../pages/keypad/keypad';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
	declarations: [
		MyApp,
		AboutPage,
		ContactPage,
		HomePage,
		TabsPage,
		DetailPage,
		KeypadPage
	],
	imports: [
		BrowserModule,
		HttpModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		AboutPage,
		ContactPage,
		HomePage,
		TabsPage,
		DetailPage,
		KeypadPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{provide: ErrorHandler, useClass: IonicErrorHandler}
	]
})
export class AppModule {}