import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DialogConfig, Task } from 'src/app/demo/api/task';

@Injectable()
export class TaskService {

    dialogConfig: DialogConfig = {
        visible: false,
        header: '',
        newTask: false
    };

    tasks: Task[] = [];

    private taskSource = new BehaviorSubject<Task[]>(this.tasks);

    private selectedTask = new Subject<Task>();

    private dialogSource = new BehaviorSubject<DialogConfig>(this.dialogConfig);

    taskSource$ = this.taskSource.asObservable();

    selectedTask$ = this.selectedTask.asObservable();

    dialogSource$ = this.dialogSource.asObservable();

    constructor(private http: HttpClient) {
        this.http.get<any>('assets/demo/data/tasks.json')
            .toPromise()
            .then(res => res.data as Task[])
            .then(data => {
                this.tasks = data;
                this.taskSource.next(data);
            });
    }

    addTask(task: Task) {
        if (this.tasks.includes(task)) {
            this.tasks = this.tasks.map(t => t.id === task.id ? task : t);
        }
        else {
            this.tasks = [...this.tasks, task];
        }

        this.taskSource.next(this.tasks);
    }

    removeTask(id: number) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.taskSource.next(this.tasks);
    }

    onTaskSelect(task: Task) {
        this.selectedTask.next(task);
    }

    markAsCompleted(task: Task) {
        this.tasks = this.tasks.map(t => t.id === task.id ? task : t);
        this.taskSource.next(this.tasks);
    }

    showDialog(header: string, newTask: boolean) {
        this.dialogConfig = {
            visible: true,
            header: header,
            newTask: newTask
        };

        this.dialogSource.next(this.dialogConfig);
    }

    closeDialog() {
        this.dialogConfig = {
            visible: false
        }

        this.dialogSource.next(this.dialogConfig);
    }

}