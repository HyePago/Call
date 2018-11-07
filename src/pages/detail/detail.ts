import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

export interface User {
	id: any,
	name: string,
	firstname: string,
	phone: string
}

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})

export class DetailPage {
	information: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
		let reuqestId: User;

		this.information = {}

		if(this.navParams.get('id')) {
			reuqestId = this.navParams.get('id');

			storage.forEach((value, key, index) => {
				if(value.id == reuqestId) {
					this.information = {
						id: value.id,
						name: key,
						firstname: key.substring(key.indexOf(' '), key.length),
						phone: value.phone
					};
				}
			});
		}
	}
}