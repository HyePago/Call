import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { DetailPage } from '../detail/detail';
import { StorageProvider } from '../../providers/storage/storage';

export interface Call {
	name: string,
	uid: number,
	phone: string,
	time: string,
	bool: boolean
}

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
	segment: String;
	calls: Array<Call>;
	editClicked: boolean;

	constructor(public navCtrl: NavController, public storageProvider: StorageProvider) {
		this.segment = 'all';
		this.editClicked = false;

		this.getCall();
	}
	segmentChange() {	
		this.getCall();
	}

	public getCall() {
		this.storageProvider.callsCast.subscribe(calls => {
			this.calls = calls;

			this.calls.reverse();

			for(let i=0; i<this.calls.length; i++) {
				if(this.segment == 'not') {
					if(this.calls[i].bool) {
						this.calls.splice(i, 1);
						i--;

						continue;
					}
				}

				let today = new Date();
				let date = new Date(this.calls[i].time);

				if(today.getFullYear() == date.getFullYear()) {
					if(today.getMonth() == date.getMonth()) {
						if(today.getDate() == date.getDate()) {
							if(date.getHours() <= 12) {
								this.calls[i].time = "오전 " + date.getHours()+':'+date.getMinutes();
							} else {
								this.calls[i].time = "오후 " + (date.getHours()-12)+':'+date.getMinutes();
							}
						} else if(today.getDate()-date.getDate() == 1) {
							this.calls[i].time = '어제';
						} else if(today.getDate()-date.getDate() <= 7) {
							var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');

							this.calls[i].time = week[date.getDay()];
						} else {
							this.calls[i].time = this.calls[i].time.substring(0, this.calls[i].time.indexOf(' '));
						}
					} else {
						this.calls[i].time = this.calls[i].time.substring(0, this.calls[i].time.indexOf(' '));
					}
				} else {
					this.calls[i].time = this.calls[i].time.substring(0, this.calls[i].time.indexOf(' '));
				}
			}
		});
	}
	detailPush(selectCall) {
		if(selectCall.uid == -1) {
			this.navCtrl.push(DetailPage, {call: selectCall});
		} else {
			this.navCtrl.push(DetailPage, {id: selectCall.uid, call: selectCall});
		}
	}
	editClick() {
		if(this.editClicked) {
			this.editClicked = false;
		} else {
			this.editClicked = true;
		}
	}
	clickDel(uid, time) {
		for(let i=0; i<this.calls.length; i++) {
			if(this.calls[i].uid == uid && this.calls[i].time == time) {
				this.calls.splice(i, 1);
				this.storageProvider.setCalls(this.calls);

				break;
			}
		}
	}
}
