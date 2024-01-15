import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VerificationComponent } from './verification.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: VerificationComponent }
    ])],
    exports: [RouterModule]
})
export class VerificationRoutingModule { }