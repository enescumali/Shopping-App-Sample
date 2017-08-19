import { Component, OnInit } from '@angular/core';
import { ServicesComponent } from '../services/services.component'
import { Injectable } from "@angular/core";

@Injectable()

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  providers: [ServicesComponent]
})

export class CatalogueComponent implements OnInit {

	public productList = [];

	constructor( public services: ServicesComponent) { 
	}

	ngOnInit() {
		this.getProductList();
	}

	//Get product list
	getProductList(){
		this.services.getProductList().subscribe(
		productList=>{
			
			this.productList = productList.data;
			// Product list has been rendered so the loading gif can be removed
			document.getElementById('catalogueLoader').classList.add('element-hide');

		})
	}

}
