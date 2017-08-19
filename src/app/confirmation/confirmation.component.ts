import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent implements OnInit {

	public productName;
	public customerName;

	constructor() { }

	ngOnInit() {

		// Getting datas from localstorage
	 	this.customerName = localStorage.getItem('customerName');
		this.productName = localStorage.getItem('productName');

		// Removing datas from localStorage
		localStorage.setItem('currentProduct', "");
		localStorage.setItem('customerName',"");
		localStorage.setItem('productName', "");
	}

}
