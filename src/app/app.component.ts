import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
import { stringify } from '@angular/compiler/src/util';

export interface Favorite {
	id: number,
	name: string,
	division: string,
	icon: string
}
export interface Call {
	name: string,
	uid: number,
	phone: string,
	time: string,
	bool: boolean
}

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
			if(data < 1) {
				let favorites: Array<Favorite>;
				favorites = [];

				let calls: Array<Call>;
				calls = [];
		
				storage.set('favorites', favorites);
				storage.set('call', calls);

				const url = "https://jsonplaceholder.typicode.com/users";

				let contacts: Array<any> = [];

				var response = this.http.get(url).map(res => res.json()).subscribe(data => {
					for(let i=0; i<data.length; i++) {
						// 각 연락처마다 번호나 이메일을 여러 개 저장할 수 있도록 한다.
						let phones = Array<{
							id: number,
							division: string,
							value: string
						}>();
						let emails = Array<{
							id: number,
							division: string,
							value: string
						}>();
						let phone: string;
						let email: string;

						phone = data[i].phone;
						phones.push({
							id: 0,
							division: '휴대전화',
							value: phone
						});
						email = data[i].email;
						emails.push({
							id: 0,
							division: '집',
							value: email 
						});
						data[i].phone = phones;
						data[i].email = emails;

						contacts.push(data[i]);
					}
					storage.set('contacts', contacts);
				});
			}
		});
	}
}
