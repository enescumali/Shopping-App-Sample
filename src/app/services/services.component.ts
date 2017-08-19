import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()

export class ServicesComponent {

	constructor(private http: Http) { }

	private baseUrl : string = "https://api.myjson.com/bins/";

	//Get Product List 
	getProductList() : Observable<any>{

		let productList$ =
			this.http.get(`${this.baseUrl}/rpuvx`,
				{headers: this.getHeaders()}
			).map(response => response.json())
				.catch(this.handleError);

		return productList$;
	}

	getHeaders(){
		let headers$ : Headers = new Headers();
		headers$.append("Accept","application/json");
		headers$.append("Content-Type","application/json");
		return headers$;
	}

	handleError(error: any) : Observable<any> {
		let errorMessage$ = error.message || "Something is wrong";
		console.log(errorMessage$);
		return Observable.throw(errorMessage$);
	}

	ngOnInit() {
	}

}
