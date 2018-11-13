import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage/storage';

import { SelectContactPage } from '../select-contact/select-contact';
import { DetailPage } from '../detail/detail';

export interface Favorite {
	id: number,
	name: string,
	division: string,
	icon: string
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	favorites: Array<Favorite>;
	editClicked: boolean;

	constructor(public navCtrl: NavController, public storageProvider: StorageProvider) {
		this.favorites = [];
		this.editClicked = false;

		this.storageProvider.favoritesCast.subscribe(favorites => this.favorites = favorites);
	}
	
	pushPage() {
		this.navCtrl.push(SelectContactPage);
	}
	detailPush(id) {
		this.navCtrl.push(DetailPage, {id: id});
	}
	editClick() {
		if(this.editClicked) {
			this.editClicked = false;
		} else {
			this.editClicked = true;
		}
	}
	clickDel(id, division) {
		for(let i=0; i<this.favorites.length; i++) {
			if(this.favorites[i].id == id || this.favorites[i].division == division) {
				this.favorites.splice(i, 1);

				this.storageProvider.setFavorite(this.favorites);
				break;
			}
		}
	}
}
