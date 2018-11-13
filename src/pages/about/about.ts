import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { DetailPage } from '../detail/detail';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
	segment: String;
	calls: Array<any>;
	editClicked: boolean;

	constructor(public navCtrl: NavController, public storageProvider: StorageProvider) {
		this.segment = 'all';
		this.editClicked = false;

		this.segmentChange();
	}
	segmentChange() {	
		this.storageProvider.callsCast.subscribe(calls => {
			this.calls = calls.slice(0);

			this.calls.reverse();
	
			console.log(this.calls);
	
			this.getCall();
		});
	}

	getCall() {
		console.log(this.calls);

		for(let i=0; i<this.calls.length; i++) {
			// 부재중이 아닌 것은 잘라낸다.
			if(this.segment == 'not') {
				if(this.calls[i].bool) {
					this.calls.splice(i, 1);
					i--;

					continue;
				}
			}

			// 날짜 차이
			let today = new Date();
			let date = new Date(this.calls[i].time);

			if(today.getFullYear() == date.getFullYear()) {
				if(today.getMonth() == date.getMonth()) {
					if(today.getDate() == date.getDate()) {
						if(date.getHours() <= 12) {
							this.calls[i].showTime = "오전 " + date.getHours()+':'+date.getMinutes();
						} else {
							this.calls[i].showTime = "오후 " + (date.getHours()-12)+':'+date.getMinutes();
						}
					} else if(today.getDate()-date.getDate() == 1) {
						this.calls[i].showTime = '어제';
					} else if(today.getDate()-date.getDate() <= 7) {
						var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');

						this.calls[i].showTime = week[date.getDay()];
					} else {
						this.calls[i].showTime = this.calls[i].time.substring(0, this.calls[i].time.indexOf(' '));
					}
				} else {
					this.calls[i].showTime = this.calls[i].time.substring(0, this.calls[i].time.indexOf(' '));
				}
			} else {
				this.calls[i].showTime = this.calls[i].time.substring(0, this.calls[i].time.indexOf(' '));
			}
		}
	}
	// 연락처 상세 페이지로 이동
	detailPush(selectCall) {
		if(selectCall.uid == -1) {
			this.navCtrl.push(DetailPage, {call: selectCall});
		} else {
			this.navCtrl.push(DetailPage, {id: selectCall.uid, call: selectCall});
		}
	}
	// 우측 상단 (편집 | 확인) 버튼 클릭
	editClick() {
		if(this.editClicked) {
			this.editClicked = false;
		} else {
			this.editClicked = true;
		}
	}
	// 삭제 아이콘 클릭
	clickDel(uid, time) {
		for(let i=0; i<this.calls.length; i++) {
			if(this.calls[i].uid == uid && this.calls[i].time == time) {
				this.calls.splice(i, 1);
				this.storageProvider.setCalls(this.calls.reverse());
				this.calls.reverse();

				break;
			}
		}
		this.segmentChange();
	}
}
