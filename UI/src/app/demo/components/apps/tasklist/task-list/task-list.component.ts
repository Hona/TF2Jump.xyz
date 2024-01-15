import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Task } from 'src/app/demo/api/task';
import { TaskService } from '../service/task.service';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {

    @Input() taskList!: Task[];

    @Input() title!: string;

    @ViewChild('menu') menu!: Menu;

    menuItems: MenuItem[] = [];

    clickedTask!: Task;

    constructor(private taskService: TaskService) { }

    ngOnInit(): void {
        this.menuItems = [
            { label: 'Edit', icon: 'pi pi-pencil', command: () => this.onEdit() },
            { label: 'Delete', icon: 'pi pi-trash', command: () => this.handleDelete() }
        ];
    }

    parseDate(date: Date) {
        let d = new Date(date);
        return d.toUTCString().split(' ').slice(1, 3).join(' ');
    }

    handleDelete() {
        this.taskService.removeTask(this.clickedTask.id);
    }

    toggleMenu(event: Event, task: Task) {
        this.clickedTask = task;
        this.menu.toggle(event);
    }

    onEdit() {
        this.taskService.onTaskSelect(this.clickedTask);
        this.taskService.showDialog('Edit Task', false);
    }

    onCheckboxChange(event: any, task: Task) {
        event.originalEvent.stopPropagation();
        task.completed = event.checked;
        this.taskService.markAsCompleted(task);
    }
}
