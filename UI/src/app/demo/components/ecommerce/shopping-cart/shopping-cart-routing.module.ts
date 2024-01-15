import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ShoppingCartComponent }
    ])],
    exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }
