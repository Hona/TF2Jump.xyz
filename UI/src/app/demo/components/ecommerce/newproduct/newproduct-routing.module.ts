import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewProductComponent } from './newproduct.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: NewProductComponent }
	])],
	exports: [RouterModule]
})
export class NewProductRoutingModule { }
