import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogEditComponent } from './blog-edit.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: BlogEditComponent }
    ])],
    exports: [RouterModule]
})
export class BlogEditRoutingModule { }
