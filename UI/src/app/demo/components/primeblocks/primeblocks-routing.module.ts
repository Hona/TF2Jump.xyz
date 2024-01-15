import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlocksComponent } from './blocks/blocks.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', data: { breadcrumb: 'Free Blocks' }, component: BlocksComponent }
	])],
	exports: [RouterModule]
})
export class PrimeBlocksRoutingModule { }
