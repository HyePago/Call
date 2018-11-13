import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Provider } from '@angular/compiler/src/core';

export interface Favorite {
	id: number,
	name: string,
	division: string,
	icon: string
}
export interface Call {
	name: string,
	uid: number,
	phone: string,
	time: string,
	bool: boolean
}
export interface Label {
	id: number,
	division: string, 
	label: string
}

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {
	private calls = new BehaviorSubject<Array<Call>>([]);
	public callsCast = this.calls.asObservable();
	private favorites = new BehaviorSubject<Array<Favorite>>([]);
	public favoritesCast = this.favorites.asObservable();
	private contacts = new BehaviorSubject<Array<any>>([]);
	public contactsCast = this.contacts.asObservable();
	private label = new BehaviorSubject<Label>({id: -1, division: '', label: ''});
	public labelCast = this.label.asObservable();

	constructor(public storage: Storage) {
		console.log('Hello StorageProvider Provider');

		this.storage.get('call').then((value) => {
			this.calls.next(value);
		});
		this.storage.get('favorites').then((value) => {
			this.favorites.next(value);
		});
		this.storage.get('contacts').then((value) => {
			this.contacts.next(value);
		});
	}

	setFavorite(newFavorites) {
		this.favorites.next(newFavorites);
		this.storage.set('favorites', newFavorites);
	}
	setCalls(newCalls) {
		this.calls.next(newCalls);
		this.storage.set('call', newCalls);
	}
	setContacts(newContacts) {
		console.log(newContacts);

		this.contacts.next(newContacts);
		this.storage.set('contacts', newContacts);
	}
	setLabel(newLabel) {
		this.label.next(newLabel);
		this.storage.set('label', newLabel);
	}
}