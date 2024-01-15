import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSummaryRoutingModule } from './ordersummary-routing.module';
import { OrderSummaryComponent } from './ordersummary.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        OrderSummaryRoutingModule,
        ButtonModule,
        RippleModule
    ],
    declarations: [
        OrderSummaryComponent
    ]
})
export class OrderSummaryModule { }
