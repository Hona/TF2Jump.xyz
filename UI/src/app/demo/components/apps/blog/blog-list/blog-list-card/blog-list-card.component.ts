import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/demo/api/blog';

@Component({
    selector: 'app-blog-list-card',
    templateUrl: './blog-list-card.component.html',
})
export class BlogListCardComponent {
    @Input() blog!: Blog;

    constructor(private router: Router) {}

    navigateToDetail(): void {
        this.router.navigateByUrl('/apps/blog/detail');
    }
}
