import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/demo/api/blog';

@Component({
    selector: 'app-blog-comments',
    templateUrl: './blog-comments.component.html'
})
export class BlogCommentsComponent {

    @Input() comments: Comment[] = [];

    rowCount = 3;

}
