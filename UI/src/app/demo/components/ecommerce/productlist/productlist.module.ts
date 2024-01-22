import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListRoutingModule } from './productlist-routing.module';
import { ProductListComponent } from './productlist.component';
import { RippleModule } from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        ProductListRoutingModule,
        RippleModule
    ],
    declarations: [ProductListComponent]
})
export class ProductListModule { }
