import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BlogAppRoutingModule } from "./blog.app-routing.module";

@NgModule({
    imports: [
        CommonModule,
        BlogAppRoutingModule
    ]
})
export class BlogAppModule { }
