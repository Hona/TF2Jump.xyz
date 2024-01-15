import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutUsComponent } from './aboutus.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AboutUsComponent }
	])],
	exports: [RouterModule]
})
export class AboutUsRoutingModule { }
