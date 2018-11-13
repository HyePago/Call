import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, Platform } from 'ionic-angular';

import { ActionSheetController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number';

import { StorageProvider } from '../../providers/storage/storage';
import { AddContactPage } from '../add-contact/add-contact';
import { SelectContactPage } from '../select-contact/select-contact';

@Component({
	selector: 'page-keypad',
	templateUrl: 'keypad.html'
})

export class KeypadPage {
	@ViewChild(Nav) nav: Nav;

	result: string;
	numbers: string[];
	words: string[];
	num: number[];
	stateStr: string;
	calls: Array<any>;
	contacts: Array<any>;

	constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, private datePipe: DatePipe, private callNumber: CallNumber, public platform: Platform, public storageProvider: StorageProvider) {
		this.result = "";
		this.stateStr = '번호 추가';

		this.numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
		this.words = [null, 'A B C', 'D E F', 'G H I', 'J K L', 'M N O', 'P Q R S', 'T U V', 'W X Y Z', null, '+', null];
		
		this.num = [];
		this.calls = [];

		for(let i=0; i<12; i+=3) {
			this.num.push(i);
		}

		this.storageProvider.callsCast.subscribe(calls => {
			this.calls = calls;
		});
		this.storageProvider.contactsCast.subscribe(contacts => {
			this.contacts = contacts.slice(0);
		});
	}

	dialClick(number) {
		if(this.result.length==3 || this.result.length==7) {
			this.result += '-';
		} else if(this.result.length == 12) {
			const temp = this.result;

			this.result = temp.substring(0, temp.lastIndexOf('-'));
			this.result += temp.substring(temp.lastIndexOf('-')+1, temp.lastIndexOf('-') + 2);
			this.result += '-';
			this.result += temp.substring(temp.lastIndexOf('-')+2, 12);
		}
		this.result += number;

		this.selectContact();
	}
	dialDel() {
		if(this.result.length == 5 || this.result.length == 9) {
			this.result = this.result.substring(0, this.result.length - 2);
		} else if(this.result.length == 13) {
			const temp = this.result;
			this.result = temp.substring(0, 7);
			this.result += '-';
			this.result += temp[7];
			this.result += temp.substring(9, temp.length - 1);
		}else {
			this.result = this.result.substring(0, this.result.length - 1);
		}

		this.selectContact();
	}
	showActionSheet() {
		const actionSheet = this.actionSheetCtrl.create({
			buttons: [
				{
					text: '새로운 연락처 등록',
					handler: () => {
						this.pushPage();
					}
				}, 
				{
					text: '기존의 연락처에 추가',
					handler: () => {
						this.selectPage();
					}
				}, {
					text: '취소',
					role: 'cancel'
				}
			]
		});

		actionSheet.present();
	}
	pushPage() {
		this.navCtrl.push(AddContactPage, {input: this.result});
	}
	selectPage() {
		this.navCtrl.push(SelectContactPage, {input: this.result});
	}
	call() { 
		var date = this.datePipe.transform(new Date(), 'yyyy.MM.dd HH:mm:dd');

		let data = {
			name: null,
			uid: -1,
			phone: this.result,
			time: date,
			bool: false
		};

		// 1. 연락처에 있는 번호인지 확인
		for(let i=0; i<this.contacts.length; i++) {
			for(let j=0; j<this.contacts[i].phone.length; j++) {
				if(this.result == this.contacts[i].phone[j].value) {
					data.name = this.contacts[i].name;
					data.uid = this.contacts[i].id;
				}
			}
		}

		if(Math.floor(Math.random() * (100 - 1) + 1) % 2) {
			data.bool = true;
		} else {
			data.bool = false;
		}

		this.calls.push(data);
		this.storageProvider.setCalls(this.calls);
		
		// Call
		if(this.platform.is("cordova")) {
			this.callNumber.callNumber(this.result, true)
			.then(res => console.log('Launched Dialer!', res))
			.catch(err => console.log('Error', err));
		} 
	}
	selectContact() {
		this.stateStr = '번호추가';

		for(let i=0; i<this.contacts.length; i++) {
			for(let j=0; j<this.contacts[i].phone.length; j++) {
				if(this.contacts[i].phone[j].value == this.result) {
					this.stateStr = this.contacts[i].name;

					break;
				}
			}
		}
	}
}