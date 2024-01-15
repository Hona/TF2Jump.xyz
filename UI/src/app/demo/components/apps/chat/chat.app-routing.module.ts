import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatAppComponent } from './chat.app.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ChatAppComponent }
	])],
	exports: [RouterModule]
})
export class ChatAppRoutingModule { }
