import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileCreateComponent } from './profilecreate.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProfileCreateComponent }
	])],
	exports: [RouterModule]
})
export class ProfileCreateRoutingModule { }
