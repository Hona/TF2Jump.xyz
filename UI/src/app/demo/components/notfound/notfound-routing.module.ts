import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: NotfoundComponent }
    ])],
    exports: [RouterModule]
})
export class NotfoundRoutingModule { }