import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@Component({
	selector: 'page-keypad',
	templateUrl: 'keypad.html'
})

export class KeypadPage {
	result: string;
	numbers: string[];
	words: string[];
	num: number[];

	constructor(public navCtrl: NavController, private storage: Storage) {
		this.result = "";

		this.numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
		this.words = [null, 'A B C', 'D E F', 'G H I', 'J K L', 'M N O', 'P Q R S', 'T U V', 'W X Y Z', null, '+', null];
		
		this.num = [];

		for(let i=0; i<12; i+=3) {
			this.num.push(i);
		}
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
	}
}