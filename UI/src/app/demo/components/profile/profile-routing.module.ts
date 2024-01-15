import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', data: {breadcrumb: 'List'}, loadChildren: () => import('./list/profilelist.module').then(m => m.ProfileListModule) },
        { path: 'create', data: {breadcrumb: 'Create'}, loadChildren: () => import('./create/profilecreate.module').then(m => m.ProfileCreateModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
