import { Component, OnInit, OnDestroy } from '@angular/core';
import { KanbanList } from 'src/app/demo/api/kanban';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { KanbanService } from './service/kanban.service';

@Component({
    templateUrl: './kanban.app.component.html',
    styleUrls: ['./kanban.app.component.scss']
})
export class KanbanAppComponent implements OnInit, OnDestroy {

    sidebarVisible: boolean = false;

    lists: KanbanList[] = [];

    listIds: string[] = [];

    subscription = new Subscription();

    style!: HTMLStyleElement;

    isMobileDevice: boolean = false;

    constructor(private kanbanService: KanbanService) {
        this.subscription = this.kanbanService.lists$.subscribe(data => {
            this.lists = data;
            this.listIds = this.lists.map(l => l.listId || '');
        });
    }

    ngOnInit() {
        this.removeLayoutResponsive();
        this.isMobileDevice = this.kanbanService.isMobileDevice();
    }

    toggleSidebar() {
        this.sidebarVisible = true;
    }

    addList() {
        this.kanbanService.addList();
    }

    dropList(event: CdkDragDrop<KanbanList[]>) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    removeLayoutResponsive() {
        this.style = document.createElement('style');
        this.style.innerHTML = `
                .layout-content {
                    width: 100%;
                }
                
                .layout-topbar {
                    width: 100%;
                }
            `;
        document.head.appendChild(this.style);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        document.head.removeChild(this.style)
    }
}
