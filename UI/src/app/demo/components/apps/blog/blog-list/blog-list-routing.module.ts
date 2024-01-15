import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: BlogListComponent }
    ])],
    exports: [RouterModule]
})
export class BlogListRoutingModule { }

