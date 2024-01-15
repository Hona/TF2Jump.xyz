import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Member } from 'src/app/demo/api/member';
import { DialogConfig, Task } from 'src/app/demo/api/task';
import { TaskService } from '../service/task.service';
import { MemberService } from 'src/app/demo/service/member.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-create-task',
    templateUrl: './create-task.component.html',
    providers: [MessageService]
})
export class CreateTaskComponent implements OnInit, OnDestroy {

    task!: Task;

    members: Member[] = [];

    filteredMembers: Member[] = [];

    dialogConfig: DialogConfig = {header: '', visible: false};

    subscription: Subscription;

    dialogSubscription: Subscription;

    constructor(private memberService: MemberService, private messageService: MessageService, private taskService: TaskService) {
        this.subscription = this.taskService.selectedTask$.subscribe(data => this.task = data);
        this.dialogSubscription = this.taskService.dialogSource$.subscribe(data => {
            this.dialogConfig = data;
            
            if(this.dialogConfig.newTask) {
                this.resetTask();
            }
        });
    }

    ngOnInit(): void {
        this.memberService.getMembers().then(members => this.members = members);
        this.resetTask();
    }

    filterMembers(event: any) {
        let filtered: Member[] = [];
        let query = event.query;

        for (let i = 0; i < this.members.length; i++) {
            let member = this.members[i];
            if (member.name?.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(member);
            }
        }

        this.filteredMembers = filtered;
    }

    save() {
        this.task.id = Math.floor(Math.random() * 1000);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Task "${this.task.name}" created successfully.` });
        this.taskService.addTask(this.task);
        this.taskService.closeDialog();
    }

    cancelTask(){
        this.resetTask()
        this.taskService.closeDialog();
    }

    resetTask() {
        this.task = { id: this.task && this.task.id ? this.task.id : Math.floor(Math.random() * 1000), status: 'Waiting' };
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
}
