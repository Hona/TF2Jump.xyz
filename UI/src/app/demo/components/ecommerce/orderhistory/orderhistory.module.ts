import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderHistoryRoutingModule } from './orderhistory-routing.module';
import { OrderHistoryComponent } from './orderhistory.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        OrderHistoryRoutingModule,
        ButtonModule,
        DividerModule,
        RippleModule
    ],
    declarations: [OrderHistoryComponent]
})
export class OrderHistoryModule { }
