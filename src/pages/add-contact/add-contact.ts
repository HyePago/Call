import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { LabelPage } from '../label/label';
import { StorageProvider } from '../../providers/storage/storage';

export interface InputInterface {
	id: number,
	division: string,
	value: string
}

@Component({
	selector: 'page-add-contact',
	templateUrl: 'add-contact.html',
})

export class AddContactPage {	
	callNumber: Array<InputInterface>;
	email: Array<InputInterface>;
	firstName: string;
	lastName: string;
	company: string;
	add: any;
	information: any;
	contacts: Array<any>;

	constructor(public navCtrl: NavController, public navParams: NavParams, public plt: Platform, public storageProvider: StorageProvider) {
		let input: string;

		input = this.navParams.get('input');
		this.information = this.navParams.get('information');
		this.add = this.navParams.get('add');

		this.callNumber = [];
		this.email = [];
		this.company = '';
		this.contacts = [];

		this.storageProvider.contactsCast.subscribe(contacts => this.contacts = contacts);
		
		if(this.information) {
			this.lastName = this.information.name.substring(0, this.information.name.indexOf(' '));
			this.firstName = this.information.name.substring(this.information.name.indexOf(' '), this.information.name.length);
		
			this.callNumber = this.information.phone;
			this.email = this.information.email;
		}
		if(input) {
			this.callNumber.push({
				id: this.callNumber.length,
				division: '휴대전화',
				value: input
			});
		}
		if(this.add) {
			for(let i=0; i<this.contacts.length; i++) {
				if(this.add.id == this.contacts[i].id) {
					this.callNumber = this.contacts[i].phone;
					this.email = this.contacts[i].email;
			
					this.lastName = this.contacts[i].name.substring(0, this.contacts[i].name.indexOf(' '));
					this.firstName = this.contacts[i].name.substring(this.contacts[i].name.indexOf(' '), this.contacts[i].name.length);
				
					this.callNumber.push ({
						id: this.callNumber.length,
						division: '휴대전화',
						value: this.add.input
					});
				}
			}
		}
	}

	ionViewWillEnter() {
		this.storageProvider.labelCast.subscribe(label => {
			if(label.id != -1) {
				if(label.division == 'number') {
					this.callNumber[label.id].division = label.label;
				} else if(label.division == 'email') {
					this.email[label.id].division = label.label;
				}
		
				this.storageProvider.setLabel({id: -1, division: '', label: ''});
			}
		});
	}

	addInput(division) {
		if(division == 'number') {
			this.callNumber.push({
				id: this.callNumber.length,
				division: '집',
				value: ''
			});
		} else if(division == 'email') {
			this.email.push({
				id: this.email.length,
				division: '집',
				value: ''
			});
		}
	}

	pushLabelPage(id, division) {
		if(division == 'number') {
			this.navCtrl.push(LabelPage, {
				division: this.callNumber[id].division,
				id: id,
				category: 'number'
			});
		} else if(division == 'email') {
			this.navCtrl.push(LabelPage, {
				division: this.email[id].division,
				id: id,
				category: 'email'
			});
		}
	}
	addContact(){
		let contact = {
			name: this.lastName + ' ' + this.firstName,
			company: this.company,
			phone: this.callNumber,
			email: this.email,
			id: 0
		};

		if(this.add) {
			contact.id = this.add.id;
			for(let i=0; i<this.contacts.length; i++) {
				if(this.contacts[i].id == contact.id) {
					this.contacts[i] = contact;
	
					break;
				}
			}
			this.storageProvider.setContacts(this.contacts);
		} else if(this.information) {
			contact.id = this.information.id;
			for(let i=0; i<this.contacts.length; i++) {
				if(this.contacts[i].id == contact.id) {
					this.contacts[i] = contact;
	
					break;
				}
			}
			this.storageProvider.setContacts(this.contacts);
		}else {
			for(let i=0; i<this.contacts.length; i++) {
				if((contact.id - 1) < parseInt(this.contacts[i].id)) {
					contact.id = (parseInt(this.contacts[i].id) + 1);
				}
			}
			this.contacts.push(contact);

			this.storageProvider.setContacts(this.contacts);
		}
/*
		this.storageService.getCall().then((val) => {
			this.events.publish('getcall', val);
		});*/

		this.navCtrl.pop();
	}

	deleteContact() {
		if(this.information) {
			for(let i=0; i<this.contacts.length; i++) {
				if(this.information.id == this.contacts[i].id) {
					this.contacts.splice(i, 1);
				}
			}

			this.storageProvider.setContacts(this.contacts);
/*
			this.storageService.getCall().then((val) => {
				this.events.publish('getcall', val);
			});
*/
			this.navCtrl.pop();
			this.navCtrl.pop();
		}	
	}
	backClick() {
		this.navCtrl.pop();	
	}
}