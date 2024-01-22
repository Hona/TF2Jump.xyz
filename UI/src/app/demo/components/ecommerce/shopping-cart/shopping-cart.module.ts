import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ShoppingCartRoutingModule,
        ButtonModule,
        RippleModule,
        DropdownModule,
    ],
    declarations: [ShoppingCartComponent],
})
export class ShoppingCartModule { }
