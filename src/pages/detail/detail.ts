import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage/storage';

import { AddContactPage } from '../add-contact/add-contact';
import { ActionSheetController } from 'ionic-angular';

export interface User {
	id: any,
	name: string,
	firstname: string,
	phone: string[]
}
export interface Call {
	time: string,
	bool: boolean
}

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})

export class DetailPage {
	information: any;
	userCalls: Array<Call>;
	favorites: Array<any>;

	constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public storageProvider: StorageProvider) {
		let reuqestId: number;
		let division: string;

		this.information = {}
		this.userCalls = [];

		this.storageProvider.favoritesCast.subscribe(favorites => {
			this.favorites = favorites;
		});

		if(this.navParams.get('id')) {
			reuqestId = this.navParams.get('id');

			this.storageProvider.contactsCast.subscribe(contacts => {
				for(let i=0; i<contacts.length; i++) {
					if(contacts[i].id == reuqestId) {
						if(!contacts[i].division) {
							division = '휴대전화';
						} else {
							division = contacts[i].division;
						}
						
						this.information = {
							id: contacts[i].id,
							name: contacts[i].name,
							firstname: contacts[i].name.substring(contacts[i].name.indexOf(' '), contacts[i].name.length),
							phone: contacts[i].phone
						};
					}
				}
			});
			if(this.navParams.get('call')) {
				this.pushCall();
			}
		} else if(this.navParams.get('call')) {
			this.pushCall();
		}
	}

	pushCall() {
		let call = this.navParams.get('call');

		this.information = {
			name: call.phone
		}

		this.storageProvider.callsCast.subscribe(calls => {
			for(let i=0; i<calls.length; i++) {
				if(calls[i].phone == call.phone) { 
					this.userCalls.push({
						time: calls[i].time,
						bool: calls[i].bool
					});
				}
					
				this.userCalls.reverse();
			}	
		});
	}
	editClick() {
		this.navCtrl.push(AddContactPage, {information: this.information});
	}
	addFavorite() {
		let actionSheet = this.actionSheetCtrl.create({
				title: '즐겨찾기에 추가',
				buttons: [
					{
						text: '메시지',
						icon: 'ios-text',
						cssClass: 'actionSheet',
						handler: () => {
							this.favorites.push({
								id: this.information.id,
								name: this.information.name,
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
							this.storageProvider.favoritesCast.subscribe(favorites => {
								this.favorites.push({
									id: this.information.id,
									name: this.information.name,
									division: 'call',
									icon: 'ios-call'
								});
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