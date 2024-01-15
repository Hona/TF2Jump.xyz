import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InvoiceComponent }
	])],
	exports: [RouterModule]
})
export class InvoiceRoutingModule { }
