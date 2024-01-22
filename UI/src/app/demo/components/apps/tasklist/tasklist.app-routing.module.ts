import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskListAppComponent } from './tasklist.app.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TaskListAppComponent }
    ])],
    exports: [RouterModule]
})
export class TaskListAppRoutingModule { }
