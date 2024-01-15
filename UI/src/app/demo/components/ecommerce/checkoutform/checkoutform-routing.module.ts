import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckoutFormComponent } from './checkoutform.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CheckoutFormComponent }
    ])],
    exports: [RouterModule]
})
export class CheckoutFormRoutingModule { }
