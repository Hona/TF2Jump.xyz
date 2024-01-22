import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRoutingModule } from './aboutus-routing.module';
import { AboutUsComponent } from './aboutus.component';

@NgModule({
	imports: [
		CommonModule,
		AboutUsRoutingModule
	],
	declarations: [AboutUsComponent]
})
export class AboutUsModule { }
