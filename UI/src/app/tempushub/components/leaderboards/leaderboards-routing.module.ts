import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', data: {breadcrumb: 'Maps'}, loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },

    ])],
    exports: [RouterModule]
})
export class LeaderboardsRoutingModule { }
