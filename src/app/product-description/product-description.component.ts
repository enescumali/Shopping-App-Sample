import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServicesComponent } from '../services/services.component';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  providers: [ServicesComponent]
})

export class ProductDescriptionComponent implements OnInit {

	public productId;
	public productDesc;
	public productName;
	public productImg;
	public productPrice;
	public productColors;
	public productStorages;
	public colorName;
	public storageName;

	public currentProductObj = {};

	@ViewChild('colorList') colorList:ElementRef; 
	@ViewChild('storageList') storageList:ElementRef; 
	

	constructor(private services: ServicesComponent,
				private activatedRoute: ActivatedRoute ) { }

	ngOnInit() {
		
		this.activatedRoute.params.subscribe((params: Params) => {
			// Get the product id from url
		    this.productId = params['id'];

		})

		this.getProductList();
	}

	getProductList(){
		this.services.getProductList().subscribe(
		productList=>{
			
			// We don't have a API that can return us a product by ID
			// so we compare the IDs and return the product details by ID
			for (var i = 0; i < productList.data.length; i++ ) {

				if( productList.data[i].id == this.productId ){
					this.productName = productList.data[i].name;
					this.productDesc = productList.data[i].desc;
					this.productImg = productList.data[i].img;
					this.productPrice = productList.data[i].price;
					this.productColors = productList.data[i].colors;
					this.productStorages = productList.data[i].storage;
					
					this.colorName = productList.data[i].colors[0].name;
					this.storageName = productList.data[i].storage[0];
					
					this.changeColor(this.colorName, null)
					this.loaderRemover();

					// Creating the object that will be stored in localStorage
					this.currentProductObj = {
						"name" : this.productName,
						"desc" : this.productDesc,
						"img"  : this.productImg,
						"price": this.productPrice,
						"storage": this.storageName,
						"color" : this.colorName
					}

					// Saving datas to localstorage to use again in checkout page 
					// without a new request
					localStorage.setItem('currentProduct', JSON.stringify(this.currentProductObj));

					return false;
				}
			}	
		})
	}

	changeColor( colorName, el ){

		this.colorName = colorName;

		// If el has value, it means a colorbox clicked
		// So, we need to change the selected
		// and update localstorage
		if (el){
			var colors = this.colorList.nativeElement.querySelectorAll('li');
			
			for ( var i = 0; i < colors.length; i++ ){
				colors[i].classList.remove('active');
			}
			
			el.target.parentElement.classList.add('active');	
		}

		this.currentProductObj["color"] = this.colorName;
		localStorage.setItem('currentProduct', JSON.stringify(this.currentProductObj));
		
	}

	changeStorage(el){

		// Changing selected storage option and updating localstorage
		var storages = this.storageList.nativeElement.querySelectorAll('a');
		
		for ( var i = 0; i < storages.length; i++ ){
			storages[i].classList.remove('active');
		}
		
		el.target.classList.add('active');

		var selectedStorage = el.target.text.trim();

		this.currentProductObj["storage"] = selectedStorage;
		localStorage.setItem('currentProduct', JSON.stringify(this.currentProductObj));	

	}

	loaderRemover(){
		
		var loaders = document.getElementsByClassName('loader');

		for ( var j = 0; j < loaders.length; j++ ){
			loaders[j].classList.add('element-hide');
		}

		document.getElementById('summaryContent').classList.remove('element-hide');
	}

}
