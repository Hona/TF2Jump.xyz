import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductOverviewComponent } from './productoverview.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProductOverviewComponent }
	])],
	exports: [RouterModule]
})
export class ProductoverviewRoutingModule { }
