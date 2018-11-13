import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage/storage';

@Component({
	selector: 'page-label',
	templateUrl: 'label.html',
})

export class LabelPage {
	labels: string[];
	input: string;
	id: string;
	division: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public storageProvider: StorageProvider) {
		this.input = this.navParams.get('division');
		this.id = this.navParams.get('id');
		this.division = navParams.get('category');

		this.labels = ['집', '직장', 'iPhone', '휴대전화', '대표', '집 팩스', '직장 팩스', '호출기', '기타'];
	}	

	backClick() {
		this.navCtrl.pop();	
	}
	labelClick(label) {
		this.storageProvider.setLabel({
			id: this.id,
			label: label,
			division: this.division
		});
		
		this.navCtrl.pop();
	}
}