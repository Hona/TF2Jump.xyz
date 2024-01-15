import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessdeniedComponent } from './accessdenied.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AccessdeniedComponent }
    ])],
    exports: [RouterModule]
})
export class AccessdeniedRoutingModule {}
