import { Component, ViewChild, ElementRef } from '@angular/core';

import { Events } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { KeypadPage } from '../keypad/keypad';


@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {
	@ViewChild('testTabs') testTabs: ElementRef;



	tab1Root = HomePage;
	tab2Root = AboutPage;
	tab3Root = ContactPage;
	tab4Root = KeypadPage;

	constructor() {

	}

	tabClickFunc(ev) {
		/*let parentId = ev.id;

		if (parentId === 't0-1') {
			this.storageService.getCall().then((val) => {
				this.events.publish('getcall', val);
			});
		}*/
	}
}
