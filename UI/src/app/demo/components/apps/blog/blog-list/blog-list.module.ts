import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AvatarModule } from 'primeng/avatar';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { BlogListCardComponent } from "./blog-list-card/blog-list-card.component";
import { BlogListComponent } from "./blog-list.component";
import { BlogListRoutingModule } from "./blog-list-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AvatarModule,
        BlogListRoutingModule,
        DataViewModule,
        DropdownModule
    ],
    declarations: [BlogListComponent, BlogListCardComponent]
  })
  export class BlogListModule { }
