import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MapsComponent} from "./maps.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'maps', data: { breadcrumb: 'jump_supersillymap' }, component: MapsComponent }
    ])],
    exports: [RouterModule]
})
export class MapsRoutingModule { }
