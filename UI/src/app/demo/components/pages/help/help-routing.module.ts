import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HelpComponent } from './help.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: HelpComponent }
	])],
	exports: [RouterModule]
})
export class HelpRoutingModule { }
