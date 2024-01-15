import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-profilemenu',
    templateUrl: './app.profilesidebar.component.html'
})
export class AppProfileSidebarComponent {
    date: Date= new Date();
    constructor(public layoutService: LayoutService) { }

    get visible(): boolean {
        return this.layoutService.state.rightMenuActive;
    }

    set visible(_val: boolean) {
        this.layoutService.state.rightMenuActive = _val;
    }
}