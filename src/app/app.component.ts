import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
import { stringify } from '@angular/compiler/src/util';

@Component({
  	templateUrl: 'app.html'
})
export class MyApp {
	rootPage:any = TabsPage;

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, public http: Http) {
		platform.ready().then(() => {
		// Okay, so the platform is ready and our plugins are available.
		// Here you can do any higher level native things you might need.
		statusBar.styleDefault();
		splashScreen.hide();
		});

		storage.length().then((data) => {
			if(data > 0) {
				const url = "https://jsonplaceholder.typicode.com/users";

				var response = this.http.get(url).map(res => res.json()).subscribe(data => {
					data.sort(function(a, b) {
						return a.name > b.name? 1: a.name < b.name? -1:0;
					});
		
					for(let i=0; i<data.length; i++) {
						storage.set(data[i].name, data[i]);
					}
				});
			}
		});
	}
}
