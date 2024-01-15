import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderSummaryComponent } from './ordersummary.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: OrderSummaryComponent }
    ])],
    exports: [RouterModule]
})
export class OrderSummaryRoutingModule { }
