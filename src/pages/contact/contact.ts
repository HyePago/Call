import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, Events } from 'ionic-angular';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { DetailPage } from '../detail/detail';
import { AddContactPage } from '../add-contact/add-contact';
import { StorageProvider } from '../../providers/storage/storage';

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
	datas: Array<any>;

	constructor(public navCtrl: NavController, public http: Http, public storageProvider: StorageProvider) {
		// storage.get(str).then((val) => {});
		this.names = [];
		this.number = 0;
		this.datas = [];

		for(let i=0; i<26; i++) {
			this.names.push({
				user: [],
				code: String.fromCharCode(i + 97),
				id: i,
			});
		}

		this.sortData();
	}
	
	sortData(){
		this.storageProvider.contactsCast.subscribe(contacts => {
			this.datas = contacts;

			this.datas.sort(function(a, b) {
				return a.name > b.name? 1: a.name < b.name? -1 : 0;
			});
		
			for(let i=0; i<this.datas.length; i++) {
				this.names[this.datas[i].name.toLowerCase().charCodeAt(0) - 97].user.push({
					name: this.datas[i].name,
					id: this.datas[i].id
				});
		
				this.number++;
			}
		});
	}
	
	movePage(uid) {
		this.navCtrl.push(DetailPage, {id: uid});
	}

	search(event: any) {
		this.names = [];
		this.number = 0;
		this.datas = [];

		for(let i=0; i<26; i++) {
			this.names.push({
				user: [],
				code: String.fromCharCode(i + 97),
				id: i,
			});
		}


		this.storageProvider.contactsCast.subscribe(contacts => this.datas = contacts);

		this.datas.sort(function(a, b) {
			return a.name > b.name? 1: a.name < b.name? -1 : 0;
		});
	
		for(let i=0; i<this.datas.length; i++) {
			if(this.datas[i].name.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1) {
				this.names[this.datas[i].name.toLowerCase().charCodeAt(0) - 97].user.push({
					name: this.datas[i].name,
					id: this.datas[i].id
				});
			}
	
			this.number++;
		}
	}

	addClick() {
		this.navCtrl.push(AddContactPage);
	}
}
