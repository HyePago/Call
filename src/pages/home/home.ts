import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	constructor(public navCtrl: NavController, public http: Http) {
		const url = "https://jsonplaceholder.typicode.com/users";

		this.http.get(url).pipe(map(res => res.json())).subscribe(data => {
			console.log(data);
		})
	}
}
