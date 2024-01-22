import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewPasswordComponent } from './newpassword.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: NewPasswordComponent }
    ])],
    exports: [RouterModule]
})
export class NewPasswordRoutingModule { }
