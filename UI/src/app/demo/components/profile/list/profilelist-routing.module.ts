import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileListComponent } from './profilelist.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProfileListComponent }
	])],
	exports: [RouterModule]
})
export class ProfileListRoutingModule { }
