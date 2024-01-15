import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './error.component.html'
})
export class ErrorComponent {
    constructor(public layoutService: LayoutService){

    }
}
