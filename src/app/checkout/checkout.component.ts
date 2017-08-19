import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServicesComponent } from '../services/services.component';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  providers: [ServicesComponent]
})

export class CheckoutComponent implements OnInit {

	public productId;
	public productDesc;
	public productName;
	public productImg;
	public productPrice;
	public productColor;
	public productStorage;

	public validationText;

	@ViewChild('customerName') customerName:ElementRef; 
	@ViewChild('customerSurname') customerSurname:ElementRef; 
	@ViewChild('customerEmail') customerEmail:ElementRef; 
	@ViewChild('customerBirth') customerBirth:ElementRef; 
	@ViewChild('customerDlvDate') customerDlvDate:ElementRef;

	constructor(private services: ServicesComponent,
				private activatedRoute: ActivatedRoute,
				private router: Router ) { }

	ngOnInit() {

		this.activatedRoute.params.subscribe((params: Params) => {
			//console.log(params['id']);
		    this.productId = params['id'];

		})
		
		// If we already have the details of selected product
		// we can take this datas from localstorage
		if( typeof localStorage.getItem('currentProduct') != "undefined" 
			&& localStorage.getItem('currentProduct') != "" ){
			
			var currentProduct = JSON.parse(localStorage.getItem('currentProduct'));
			
			this.productName = currentProduct.name;
			this.productDesc = currentProduct.desc;
			this.productImg = currentProduct.img;
			this.productPrice = currentProduct.price;
			this.productStorage = currentProduct.storage;
			this.productColor = currentProduct.color;
			

			this.loaderRemover();	

		} else {
			this.getProductList();
		}
		
	}

	getProductList(){
		this.services.getProductList().subscribe(
		productList=>{
			
			for (var i = 0; i < productList.data.length; i++ ) {

				if( productList.data[i].id == this.productId ){
					this.productName = productList.data[i].name;
					this.productDesc = productList.data[i].desc;
					this.productImg = productList.data[i].img;
					this.productPrice = productList.data[i].price;

					this.loaderRemover();

					return false;
				}
			}	
		})
	}

	submitOrder(){
		
		// Remove validation text
		this.validationText = "";

		// Getting all inputs
		var inputs = document.querySelectorAll('.form-area input');
		var warnCount = 0;

		// First, checking blank inputs and painting
		for ( var i = 0; i < inputs.length; i++ ){

			if ( (<HTMLInputElement>inputs[i]).value == "" || (<HTMLInputElement>inputs[i]).value == " " ){
				(<HTMLInputElement>inputs[i]).classList.add('warn');
				warnCount++;
			}
		}

		// If more than 2 inputs are blank, should use a common sentence
		if ( warnCount > 2){
			this.validationText = "Please fill all required inputs.";
			return false;	
		}

		if( this.customerName.nativeElement.value == "" ){

			this.validationText = "Please type your name";
			return false;
		}

		if( this.customerSurname.nativeElement.value == "" ){

			this.validationText = "Please type your surname";
			return false;
		}

		if( this.customerEmail.nativeElement.value == "" ){

			this.validationText = "Please type your e-mail address";
			return false;

		}else if( !this.validateEmail(this.customerEmail.nativeElement.value)){
			this.validationText = "Please type a valid e-mail address";
			return false;
		}

		if( this.customerBirth.nativeElement.value == "" ){

			this.validationText = "Please pick your date of birth";
			return false;
		}

		if( this.customerDlvDate.nativeElement.value == "" ){

			this.validationText = "Please pick your delivery date";
			return false;
		}
		
		// Saving customer name and product name to show in confirmation page
		localStorage.setItem('customerName', (<HTMLInputElement>this.customerName.nativeElement).value);
		localStorage.setItem('productName', this.productName);

		this.router.navigate(['/confirmation']);
	}

	removeWarn( el ){
		el.target.classList.remove('warn');
	}

	validateEmail(email) {
    	var rgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return rgx.test(email);
	}

	loaderRemover(){
		var loaders = document.getElementsByClassName('loader');

		for ( var j = 0; j < loaders.length; j++ ){
			loaders[j].classList.add('element-hide');
		}
		
		document.getElementById('summaryContent').classList.remove('element-hide');
	}
}
