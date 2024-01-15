import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductOverviewComponent } from './productoverview.component';
import { ProductoverviewRoutingModule } from './productoverview-routing.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		InputNumberModule,
		ButtonModule,
		RippleModule,
		TabViewModule,
		ProductoverviewRoutingModule
	],
	declarations: [ProductOverviewComponent]
})
export class ProductoverviewModule { }
