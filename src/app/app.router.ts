import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';


import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { CatalogueComponent } from './catalogue/catalogue.component';

const router: Routes = [
	{ path : '', redirectTo: '/catalogue', pathMatch: 'full'},
	{ path : 'catalogue', component: CatalogueComponent},
	{ path : 'product-description/:id', component: ProductDescriptionComponent},
	{ path : 'checkout/:id', component: CheckoutComponent},
	{ path : 'confirmation', component: ConfirmationComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(router)],
	exports: [RouterModule]
})

export class AppRoutingModule {}