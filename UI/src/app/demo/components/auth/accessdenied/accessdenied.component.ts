import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';


@Component({
    templateUrl: './accessdenied.component.html'
})
export class AccessdeniedComponent { 
    constructor(public layoutService: LayoutService){

    }
}