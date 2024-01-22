import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LockScreenComponent } from './lockscreen.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LockScreenComponent }
    ])],
    exports: [RouterModule]
})
export class LockScreenRoutingModule { }
