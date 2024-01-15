import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { BlogCommentsComponent } from "./blog-comments/blog-comments.component";
import { NewCommentComponent } from "./new-comment/new-comment.component";
import { BlogDetailComponent } from "./blog-detail.component";
import { BlogDetailRoutingModule } from "./blog-detail-routing.module";
import { RippleModule } from "primeng/ripple";

@NgModule({
    imports: [
        CommonModule,
        BlogDetailRoutingModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        RippleModule
    ],
    declarations: [BlogCommentsComponent, NewCommentComponent, BlogDetailComponent]
})
export class BlogDetailModule { }
