import { Component } from '@angular/core';
import { Comment } from 'src/app/demo/api/blog';

@Component({
    templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent {

    comments: Comment[] = [
        {
            image: "assets/demo/images/avatar/circle/avatar-f-3@2x.png",
            name: "Courtney Henry",
            date: "03 February 2022",
            description: "Reprehenderit ut voluptas sapiente ratione nostrum est."
        },
        {
            image: "assets/demo/images/avatar/circle/avatar-f-1@2x.png",
            name: "Esther Howard",
            date: "03 February 2022",
            description: "How likely are you to recommend our company to your friends and family ?"
        },
        {
            image: "assets/demo/images/avatar/circle/avatar-f-4@2x.png",
            name: "Darlene Robertson",
            date: "03 February 2022",
            description: "Quo quia sit nihil nemo doloremque et."
        },
        {
            image: "assets/demo/images/avatar/circle/avatar-f-5@2x.png",
            name: "Esther Howard",
            date: "03 February 2022",
            description: "How likely are you to recommend our company to your friends and family ?"
        }
    ];

}
