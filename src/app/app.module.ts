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
import { AddContactPage } from '../pages/add-contact/add-contact';
import { LabelPage } from '../pages/label/label';
import { SelectContactPage } from '../pages/select-contact/select-contact';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { DatePipe } from '@angular/common';
//import { StroageServiceProvider } from '../providers/storage-service/storage-service';
import { CallNumber } from '@ionic-native/call-number';
import { StorageProvider } from '../providers/storage/storage';

@NgModule({
	declarations: [
		MyApp,
		AboutPage,
		ContactPage,
		HomePage,
		TabsPage,
		DetailPage,
		KeypadPage,
		AddContactPage,
		LabelPage,
		SelectContactPage
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
		KeypadPage,
		AddContactPage,
		LabelPage,
		SelectContactPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		CallNumber,
		DatePipe,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
 		StorageProvider,
	]
})
export class AppModule { }
