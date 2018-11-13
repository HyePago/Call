import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ActionSheetController } from 'ionic-angular';

import { AddContactPage } from '../add-contact/add-contact';
import { StorageProvider } from '../../providers/storage/storage';
import { ValueTransformer } from '@angular/compiler/src/util';

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
	selector: 'page-select-contact',
	templateUrl: 'select-contact.html'
})

export class SelectContactPage {
	names: Array<Information>;
	number: number;
	datas: Array<any>;
	input: string;
	favorites: Array<any>;

	constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public storageProvider: StorageProvider) {
		this.names = [];
		this.number = 0;
		this.datas = [];

		this.input = this.navParams.get('input');

		// storage.get(str).then((val) => {});

		for(let i=0; i<26; i++) {
			this.names.push({
				user: [],
				code: String.fromCharCode(i + 97),
				id: i,
			});
		}

		this.storageProvider.favoritesCast.subscribe(favorites => {
			this.favorites = favorites;
		});

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
		if(this.input) {
			this.navCtrl.push(AddContactPage, {add: {
				id: uid,
				input: this.input
			}
			});
		} else {
			let userName = '';
			let userId: number = 0;

			this.storageProvider.contactsCast.subscribe(contacts => {
				for(let i=0; i<contacts.length; i++) {
					if(contacts[i].id == uid) {
						userName = contacts[i].name;
						userId = contacts[i].id;

						break;
					}
				}
			});

			let actionSheet = this.actionSheetCtrl.create({
				title: '즐겨찾기에 추가',
				buttons: [
					{
						text: '메시지',
						icon: 'ios-text',
						cssClass: 'actionSheet',
						handler: () => {
							console.log('handle');
							// this.storageProvider.favoritesCast.source.value.push
							this.favorites.push({
								id: userId,
								name: userName,
								division: 'message',
								icon: 'ios-text'
							});
							
							this.storageProvider.setFavorite(this.favorites);
							this.navCtrl.pop();
						}
					},
					{
						text: '통화',
						icon: 'ios-call',
						cssClass: 'actionSheet',
						handler: () => {
							this.favorites.push({
								id: userId,
								name: userName,
								division: 'call',
								icon: 'ios-call'
							});
							
							this.storageProvider.setFavorite(this.favorites);
							this.navCtrl.pop();
						}
					},
					{
						text: '취소',
						role: 'cancel'
					}
				]
			});

			actionSheet.present();
		}
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

		
		this.storageProvider.contactsCast.subscribe(contacts => {
			this.datas = contacts;

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
		});
	}
	cancelClick() {
		this.navCtrl.pop();
	}
}