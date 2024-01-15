import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EcommerceDashboardComponent } from './ecommerce.dashboard.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EcommerceDashboardComponent }
	])],
	exports: [RouterModule]
})
export class EcommerceDashboardRoutigModule { }
