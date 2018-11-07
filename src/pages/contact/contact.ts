import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
import { stringify } from '@angular/compiler/src/util';

import { DetailPage } from '../detail/detail';

export interface User {
	name: string,
	id: string
}
export interface Information {
	user: Array<User>,
	code: string, 
	id: any,
}

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {
	@ViewChild(Nav) nav: Nav;

	names: Array<Information>;
	number: number;

	constructor(public navCtrl: NavController, public http: Http, public storage: Storage) {
		this.names = [];
		this.number = 0;
		// storage.get(str).then((val) => {});

		for(let i=0; i<26; i++) {
			this.names.push({
				user: [],
				code: String.fromCharCode(i + 97),
				id: i,
			});
		}

		storage.forEach((value, key, index) => {
			/*if(typeof this.names[key.charCodeAt(0)-97].name == undefined) {
				this.names[key.charCodeAt(0)].name = [];
			}*/

			this.names[key.toLowerCase().charCodeAt(0) - 97].user.push({
				name: key,
				id: value.id
			});
			this.number++;
		});
	}

	movePage(uid) {
		this.navCtrl.push(DetailPage, {id: uid});
	}

	search(event: any) {
		this.names = [];
		this.number = 0;

		for(let i=0; i<26; i++) {
			this.names.push({
				user: [],
				code: String.fromCharCode(i + 97),
				id: i,
			});
		}

		this.storage.forEach((value, key, index) => {
			/*if(typeof this.names[key.charCodeAt(0)-97].name == undefined) {
				this.names[key.charCodeAt(0)].name = [];
			}*/

			if(key.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1) {
				this.names[key.toLowerCase().charCodeAt(0) - 97].user.push({
					name: key,
					id: value.id
				});

				this.number++;
			}
		});

		console.log("event : " + event.target.value);
	}
}
